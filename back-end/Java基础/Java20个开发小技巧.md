### 字符串拼接  

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

### 有序的 JSONObject 

由于 com.alibaba.fastjson.JSONObject 默认是由hashMap组成的，所以内容存放的顺序并不是有序的。

实现有序的话需要使用LinkedHashMap的方式，在新建 JSON 对象的时候要这样写

```java
JSONObject resJson = new JSONObject(new LinkedHashMap<String, Object>());
```

