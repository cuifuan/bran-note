## 1.字符串拼接  

用分隔符号来拼接数组或者集合.  
使用`StringJoiner`,示例代码如下  
```java
List<Integer> numList = Arrays.asList(1,2,3,111,23);
StringJoiner joiner = new StringJoiner(",");
for (Integer num : numList) {
    joiner.add(String.valueOf(num));
}
System.out.println(joiner);
```
代码输出结果:  
```
1,2,3,111,23
```

