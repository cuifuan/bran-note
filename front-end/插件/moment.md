# moment 常用的操作

**1. 时间戳转为时间**
```javascript
let timestampX = 1780448977000;
moment(timestampX).('YYYY-MM-DD'); // 2026-06-03
```

**2. 时间转为时间戳**
```javascript
moment(new Date()).valueOf(); // 1626317159000
```


## 时间与时间戳互转

```javascript
时间：var time = new Date(); // Tue Aug 28 2018 09:16:06 GMT+0800 (中国标准时间)

时间戳：var timestamp = Date.parse(time); // 1535419062000 （Date.parse() 默认不取毫秒，即后三位毫秒为0）

获取时间戳：moment(time).valueOf(); // 1535419062126

获取时间：moment(timestamp).format(); // 2018-08-28T09:17:42+08:00
```



## 时间计算

添加天数  

```javascript
moment().add(7, 'days');
// 或者简写
moment().add(7, 'd');
```

类型列表

- years（y）：年
- quarters（Q）：季度
- months（M）：月
- weeks（w）：周
- days（d）：日
- hours（h）：时
- minutes（m）：分
- seconds（s）：秒
- milliseconds（ms）：毫秒