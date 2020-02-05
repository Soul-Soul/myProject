// 引入mockjs
const Mock = require('mockjs');
const qs = require('qs');
// 获取 mock.Random 对象
const Random = Mock.Random;

// 登录
const login = function() {
    let status = false;//登录状态：ture--成功，false--失败
    status = true;
    return {
        status: status
    }
}
// 表格分页
const tblList = function(param) {
    param = param.body || '';//获取传过来的参数
    // console.log(qs.parse(param));//因为axios的post带参数被qs.stringfy()转换了，需要转回来。
    if(param == ''){
        //无查询条件
        let bookdata = Mock.mock({
            'books|1-10': [{
                'sid|+1': 1,
                'date': '@date("yyyy-MM-dd")',
                'name': '@csentence()',
                'address': '@county(true)',
                'region': '双流区'
            }]
        });
        // console.log(bookdata);
        return bookdata;

    }else{
        //带查询条件
        let paramObj = qs.parse(param);
        console.log('input parameter：...');
        console.log(paramObj);
        let books = [];
        for (let i = 0; i < 10; i++) {
            let newBook = {
                // thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
                date: Random.date(),
                name: paramObj.name+Random.csentence(),
                address: Random.county(true),
                region: paramObj.region
            }
            books.push(newBook)
        }
        return {
            books: books
        }
    }

}
//图书列表
const bookList = function(param) {
    param = param.body || '';//获取传过来的参数
    // console.log(qs.parse(param));
    // 因为axios的post带参数被qs.stringfy()转换了，需要转回来。
    let paramObj = qs.parse(param);
    console.log(paramObj);
    let nameInput = paramObj.name || '';
    let books = [];
    for (let i = 0; i < 10; i++) {
        let temp = i+1;
        let newBook = {
            sid: temp,
            // thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
            author: Random.name(2,4),
            name: '《'+nameInput+Random.csentence()+"》",
            publishAt: Random.date(),
            description: Random.cparagraph()
        }
        books.push(newBook)
    }
    return {
        books: books
    }
}
//获取文件列表
const fileList = function (param) {
    param = param.body || '';//获取传过来的参数
    // console.log(qs.parse(param));
    // 因为axios的post带参数被qs.stringfy()转换了，需要转回来。
    let paramObj = qs.parse(param);
    console.log(paramObj);
    let files = [];
    for (let i = 0; i < 3; i++) {
        let newFile = {
            name: paramObj.username + i +'.png',
            url: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
        }
        files.push(newFile)
    }
    return {
        fileList: files
    }
}

Mock.mock('api/login', 'post', login);// 登录
Mock.mock('/mk_tbllist', 'post', tblList);// 表格分页
Mock.mock('/mk_booklist', 'post',bookList);// 图书列表
Mock.mock('/mk_fileupload', 'post',{});// 文件上传
Mock.mock('/mk_fetchFiles', 'post',fileList);// 获取文件列表