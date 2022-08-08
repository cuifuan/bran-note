# Java基础篇：接口

## 介绍

`Java` 中的 `接口` 定义为用于指定实现类行为的抽象类型，Java接口包含 `静态常量` 和 `抽象方法` , 1.8之后还有 `默认方法` 与 `静态方法` 。一个类可以实现多个接口。  
在Java中，接口是使用 `interface` 关键字声明的。在 `JDK8` 之前接口中的所有方法都是 `隐式公开` 和 `抽象` 的, 1.8版本之后可以在接口中定义静态方法与使用 `default` 声明的带 `方法体` 的方法。

``` mermaid
graph LR;
接口---静态常量
接口---抽象方法
接口---默认方法
接口---静态方法
```

## 使用 

抽取一系列对象的公共特征, 声明方法后进行统一实现, 例如猫和老鼠都是动物, 都可以爬或者叫等等, 这个时候我们定义一个动物接口, 声明爬行和叫声的公共抽象方法, 创建猫和老鼠的类进行实现动物接口   

优点:  当增加一个公共抽象方法, 例如在动物接口中增加 `毛色` 方法, 这样我们不用去用脑去记忆有多少动物实现了它, 因为编译的时候会报错误, 很清晰的给动物实现类增加方法, 而无需去担心漏掉某个动物没有毛色    

代码实现:  

``` java
interface Animal {
    public void move();
}

class Cat implements Animal {
    public void move(){
        System.out.println("猫行走的方法...");
    }    
}

class Dog implements Animal {
    public void move(){
        System.out.println("狗行走的方法...");
    }    
}

```

给动物增加一个毛色  

```java
interface Animal {
    // ...其他方法
    public void color();
}
```

这个时候如果`Cat`和`Dog`类如果不重写`color`方法的话,就会编译报错  

## 新特性::默认方法

以前的接口向后兼容性不好, 例如我想在动物类中增加一个如何食用该动物, 那么总不能每个动物都要实现吧, 所以就需要这种可以不实现这个方法

```java
interface Animal {
    default void howToEat(){
        System.out.println("Animal:实现了这个接口的类可以不实现这个方法");
    }
}   
```
那么问题来了, 假如有一个`兔子`类, 在实现了`Animal`的同时又实现了`Mammal`(哺乳动物), 而两个接口中都包含`howToEat`方法  

```java
interface Mammal {
    default void howToEat(){
        // 实现了这个接口的类可以不实现这个方法
        System.out.println("Mammal:哺乳动物食用方法...");
    }
}
public class Rabbit implements Animal, Mammal{

}  
```
上述代码编译出错, 如下:  

![错误信息](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4eaf1ae83c454dd48aa5883c94cb2add~tplv-k3u1fbpfcp-watermark.image)  

这个时候我们就要重写`howToEat`方法了  

```java
public class Rabbit implements Animal, Mammal {
    @Override
    public void howToEat() {
        System.out.println("麻辣兔头");
    }
}
```

## 新特性::静态方法  

假如我想获取哺乳动物的腿的数量, 我又不想去调取其实现类, 或者每个实现类写其有几条腿或者爪子什么之类的  

```java
public interface Mammal {
    static int getLegByName(String name) {
        switch (name) {
            case "兔子":
                return 4;
            case "鸭子":
                return 2;
            default:
                return 0;
        }
    }
}    
```

## 总结 

总结:  
- 接口固定了实现类对指定方法的实现特征
- jdk8新特性, 可以在接口中定义静态方法与默认方法