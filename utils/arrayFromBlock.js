
const arrayFromBlock = (block = '', operator = '\n') => {
    block = block.split(operator)
    return block;
};

export default arrayFromBlock;