export const isNotNullORBlank = (...args) => {
    for (let i = 0; i < args.length; i++) {
        let argument = args[i];
        if (argument == null || argument === '' || argument === undefined) {
            console.log("数据不能为空");
            return false;
        }
    }
    return true;
};

