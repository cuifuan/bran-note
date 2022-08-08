# JDK8 常用的时间操作

> 注意：LocalDateTime是不可变并且线程安全的

## 1.获取当前的时间

```java
LocalDateTime localDateTime = LocalDateTime.now();
System.out.println(localDateTime);
```

使用DateTimeFormatter来格式化时间  

DateTimeFormatter是JDK8用来替代线程不安全的SimpleDateFormat，用来进行时间的格式化  

现在我们来格式化时间的输出  

```java
LocalDateTime localDateTime = LocalDateTime.now();
System.out.println("LocalDateTime.now 输出:" + localDateTime);
String fmtDate = localDateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
System.out.println("格式化后的时间:" + fmtDate);
```

上述代码输出为:  

> 2021-08-17T10:03:56.249
> 格式化后的时间:2021-08-17 10:03:56

## 2.时间格式转时间戳

将`Instant`在Java日期时间API类（`java.time.Instant`）代表在时间线上一个特定的时刻。瞬间被定义为自原点（称为`epoch`）以来的偏移量。原点是 1970 年 1 月 1 日 - 00:00 - 格林这是标准时间 (GMT)

```java
long timeLong = LocalDateTime.now().toInstant(ZoneOffset.of("+8")).toEpochMilli();
System.out.println("LocalDateTime获取的时间戳:" + timeLong);
System.out.println("系统获取的时间戳:" + System.currentTimeMillis());
```

上述代码输出为:    

> LocalDateTime获取的时间戳:1629166353154
> 系统获取的时间戳:1629166353155

特定时间转为时间戳:    

```java
LocalDateTime specificTime = LocalDateTime.of(2021, Month.DECEMBER, 17, 21, 57, 00);
long specificTimeX = specificTime.toInstant(ZoneOffset.of("+8")).toEpochMilli();
System.out.println("特定时间的时间戳:" + specificTimeX);
```

## 3.时间戳转时间

```java
LocalDate localDate = Instant.ofEpochMilli(1629166353155L).atZone(ZoneOffset.ofHours(8)).toLocalDate();
System.out.println("时间戳:1629166353155 的时间为:" + localDate);
```

或者转成LocalDateTime以后然后进行格式化  

```java
LocalDateTime date = LocalDateTime.ofInstant(Instant.ofEpochMilli(1629166353155L), ZoneId.systemDefault());
String dateFmt = date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
System.out.println("时间戳转换为时间输出:" + date);
System.out.println("时间戳转换为时间并格式化输出:" + dateFmt);
```

上述代码输出为:    

> 时间戳转换为时间输出:2021-08-17T10:12:33.155
> 时间戳转换为时间并格式化输出:2021-08-17 10:12:33

## 4.对时间进行加减

**对天数进行加减**

```java
LocalDateTime localDateTime = LocalDateTime.now();
System.out.println("当前日期加一天,使用plusDays:" + localDateTime.plusDays(1));
System.out.println("当前日期减一天,使用minusDays:" + localDateTime.minusDays(1));
System.out.println("当前日期减一天,使用plusDays:" + localDateTime.plusDays(-1));
```

上述代码输出为:    

> 当前日期加一天,使用plusDays:2021-08-18T10:44:25.153
> 当前日期减一天,使用minusDays:2021-08-16T10:44:25.153
> 当前日期减一天,使用plusDays:2021-08-16T10:44:25.153

**获取一个月后的时间**

```java
LocalDateTime localDateTime = LocalDateTime.now().plusMonths(1);
```

**获取一个月前的时间**

```java
LocalDateTime localDateTime2 = LocalDateTime.now().minusMonths(1);
```

其他的类似得就不多举例了，归总如下：  

```java
plusYears()
plusMonths()
plusWeeks()
plusDays()
plusHours()
plusMinutes()
plusSeconds()
plusNanos()
```

上面都是获取未来的时间，想要获取历史时间，把`plus`换成`minus`即可  

## 5.获取时间差

有时候我们想获取两个时间的差值，这个时候我们就会用到`java.time.Duration`,使用到的方法如下  

```java
Duration.between(p1, p2)
```

如果对象的类型不同，则根据第一个对象的类型计算持续时间。  

 例p1类型是LocalTime，则p2将转换为LocalTime,指定的时间对象必须支持SECONDS单元，不然会报错。例如：  

```java
LocalDate localDate = LocalDate.of(2021, 12, 13);
LocalDateTime localDateTime9 = LocalDateTime.parse("2008-12-13T10:15:11");
Duration erroDuration = Duration.between(localDate, localDateTime9);
System.out.println(erroDuration.toMillis());
```

结果就是报错：  

```java
Exception in thread "main" java.time.DateTimeException: Invalid value for MonthOfYear (valid values 1 - 12): 13
	at java.time.temporal.ValueRange.checkValidValue(ValueRange.java:311)
	at java.time.temporal.ChronoField.checkValidValue(ChronoField.java:703)
	at java.time.LocalDate.of(LocalDate.java:267)
```

 为了完全准确，应支持NANOS单元或NANO_OF_SECOND字段。
如果结束在开始之前，则此方法的结果可能是负周期。 为了保证在结果上获得正持续时间调用abs() 。  

```java
LocalDateTime localDateTime = LocalDateTime.now().plusMonths(1);
LocalDateTime localDateTime2 = LocalDateTime.now().minusMonths(1);
Duration duration = Duration.between(localDateTime, localDateTime2);
System.out.println("两个时间差天数:" + duration.abs().toDays());
```

上述代码输出为:   

> 两个时间差天数:61

**获取相差的小时**

```java
System.out.println("两个时间差小时:" + duration.abs().toHours());
```

上述代码输出为:    

> 两个时间差小时:1488

其他的类似得就不多举例了，归总如下：

> toMinutes() // 时间差值转为分钟
>
> toMillis()  // 时间差值转为毫秒
>
> toNanos()  // 时间差值转为纳秒

