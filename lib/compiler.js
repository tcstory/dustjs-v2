const {parse} = require('./parser')

function filterAST(ast) {
  return compiler.filterNode({}, ast);
}

function noop(ctx, node) {
  return node;
}

function compactBuffers(ctx, node) {
  const out = [node[0]];
  let memo;

  for (let i =0; i < node.length; i++) {
    const res = compiler.filterNode(ctx, node[i]);
    if (res) {
      if (res[0] === 'buffer' || res[0] === 'format') {
        if (memo) {
          memo[0] = res[0] === 'buffer' ? 'buffer' : memo[0];
          memo[1] += res.slice(1).join('')
        } else {
          memo = res;
          out.push(res);
        }
      } else {
        memo = null;
        out.push(res);
      }
    }
  }

  return out;
}

const compiler = {
  compile(source, name) {
    try {
      const ast = parse(source);
      console.log('ast', ast)
      return compile(filterAST(ast), name)
    } catch (err) {
      if (err.location) {
        throw new SyntaxError(err.message + ' [' + name + ':' + err.location.start.line + ':' + err.location.start.column + ']');
      } else {
        throw err;
      }
    }
  },
  filterNode(ctx, node) {
    return compiler.optimizers[node[0]](ctx, node);
  },
  optimizers: {
    body: compactBuffers,
    buffer: noop,
  }
}

module.exports = compiler;
