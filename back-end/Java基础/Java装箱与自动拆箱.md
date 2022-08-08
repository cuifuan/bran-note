# Java装箱与自动拆箱

## 介绍

Java 编译器在`基本数据类型`和其对应的`对象封装类型`之间进行自动转换.例如将`int`转成`Integer`,将`char`转成包装类`Character`等等.其他基本数据类型的转换如下:  

Java 中 8 种基本数据类型  
|基本数据类型 | 类型|大小|包装类|取值范围|取值范围Pro|
|------------ | -------------|-------------|-------------|-------------|-------------|
|byte | 数值型 | 8bit| Byte|-2^7 ~ 2^7-1|-128 ~ 127|
|short | 短整形|16bit|Short|-2^15 ~ 2^15-1|-32768 ~ 32767|
|int | 数值整型|32bit|Integer|-2^31 ~ 2^31-1|-2147483648 ~ 2147483647|
|long | 数值长整形|64bit|Long|-2^63 ~ 2^63-1|-9223372036854775808 ~ 9223372036854775808|
|float | 单精度数值型|32bit|Float||3.4e-45 ~ 1.4e38|
|double | 双精度数值型|64bit|Double||4.9e-324 ~ 1.8e308|
|char| 短整形|16bit|Character|0~65535|\u0000 ~ \uffff|
|boolean| 布尔值|8bit(争议)|Boolean|/|/|

反之,从包装类转换成基本数据类型叫`拆箱`.例如从`Integer`到`int`或者从包装类`Long`转换成基本数据类型`long`.


## 简单的装箱示例

```java
Integer numA = 10;
Character charA  = 'a';
```
从原始数据类型创建整数对象
```java
Integer b = new Integer(9);
```
看一下下面的代码:  
```java
List<Integer> li = new ArrayList<>();
for (int i = 1; i < 50; i += 2)
    li.add(Integer.valueOf(i));
```
上面的代码将 Java 基本数据类型 `int` ,而不是对应的 `Integer` 对象添加到 `list` 集合中,代码为什么会编译通过呢?  
因为它从 `i` 创建了一个 `Integer` 对象并将该对象添加到 `li`集合中.  
因此，编译器在运行时将之前的代码转换为以下代码：  

```java
List<Integer> li = new ArrayList<>();
for (int i = 1; i < 50; i += 2)
    li.add(Integer.valueOf(i));
```
将基本数据类型值（例如 int）转换为相应包装类（Integer）的对象称为自动装箱。当基本数据类型在下面的使用情况的时候,会进行自动装箱：  
- 作为参数传递给需要**相应包装类的对象**的方法。
- 赋值给相应包装类的变量.

## 自动拆箱

```java
int a = 9;
Integer b = new Integer(9);
System.out.println(a==b);
// 返回true
```

数学运算 `+, %, +=` 不适用于 `Integer` 对象。  

Java 编译器编译代码时没有错误，因为它`自动执行拆箱`，在运行时调用 `intValue` 将 `Integer` 转换为 `int`.  

```java
System.out.println(a==b.intValue());
```

将包装类型 (Integer) 的对象转换为其对应的原始 (int) 值称为拆箱。当包装类使用情况如下的时候,会进行自动拆箱：  
- 作为参数传递给需要相应原始类型值的方法
分析如下代码:  
```java
public class TestTran {
    public static void main(String[] args) {
        unboxing(new Integer(9));
    }
    public static void unboxing(int testId) {
        System.out.println(testId);
    }
}
```
可以看到参数需要的是基本数据类型.传过去一个 Integer 对象,编译器没有报错.因为作为参数传递给需要相应原始类型值的方法,Java 编译器做了自动拆箱的操作.

- 赋值给相应原始类型的变量  

分析如下代码:  

```java
Integer a = new Integer(9);
int b =a;
```

当把对应的包装类型 b 对象,赋值给给相应原始类型的变量的时候.Java 编译器就会做自动拆箱的操作.  

## 自动转换(拓展)

从低范围转到高范围类型转换属于自动类型转换, 是 JVM 自动进行转换的.  

![](https://oscimg.oschina.net/oscnet/up-8868e02b42788ea06de313d71d1814e50cb.png)

如上图中,`byte char short`这三个是平级的  
自动转型的示例代码如下:  
```java
int num = 100;
double numPro = num;
System.out.println("转换前:" + num);
System.out.println("转换后:" + numPro);
```
代码输出如下:  
```java
转换前:100
转换后:100.0
```

## 面试题

**1.给出如下代码，请回答输出了什么**

```java
public static void main(String[] args) {
    Integer numA = 100;
    Integer numB = 100;
    Integer numC = 128;
    Integer numD = 128;
    System.out.println(numA == numB);
    System.out.println(numC == numD);
}
```
想一下会输出什么，这样的面试题层出不穷，有没有什么好应对的方式  
理理清楚自动装箱与拆箱，例如开篇的表格中有一个范围，Integer 的范围  
Integer 把这个范围（-128 ～ 127）当成了一个缓存池，如果不在这个范围会使用 new 创建  
所以现在的代码输出是：  

```java
true
false
```
**2. Java 1.5 的自动装箱拆箱机制是编译时执行还是虚拟机运行时执行**  

答：编译时执行.  

**3.给出如下代码，请回答输出了什么**  

```java
public static void main(String[] args) {
    Double numA = 10.0;
    Double numB = 10.0;
    System.out.println(numA == numB);
    System.out.println(numA.equals(numB));
    System.out.println(numA == 10);
}
```
上面的结果为 `false` `true` `true`  
分析:  为什么 `System.out.println(numA == 10)`也是`true`  
我这里使用 `IDEA` 查看编译的字节码，如下：  
```java
LINENUMBER 10 L6
GETSTATIC java/lang/System.out : Ljava/io/PrintStream;
ALOAD 1
INVOKEVIRTUAL java/lang/Double.doubleValue ()D
LDC 10.0
DCMPL
IFNE L7
ICONST_1
GOTO L8
```
因为做了拆箱操作，等同于`System.out.println(numA.doubleValue() == 10);`  