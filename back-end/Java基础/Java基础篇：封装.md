---

![](https://cdn.nlark.com/yuque/0/2021/png/631242/1617757211573-0bc0967f-67ed-4196-8603-04f49607374c.png#align=left&display=inline&height=190&margin=%5Bobject%20Object%5D&originHeight=190&originWidth=640&size=0&status=done&style=none&width=640)


## 介绍


面向对象最基本的特征，把真实世界的某些物体包成对象，里面的信息不对外公开，只公开某些特定方法让别人使用，内部的属性与逻辑都隐藏起来，不让人直接使用，也不需要让别人直接使用，就是所谓的`封装`


设想一个例子，`提款机`，你不知道它里面还有多少钱，也不知道内部的运做，不知道哪家公司生产的机器，但你还是会去使用他提供的方法：`查询余额`、`提款`。因为他只开放这两个方法给一般人使用，你要使用这两个方法需要带入的参数是提款卡及密码，就可以完成你的需求


```java
class ATM {
    private BigDecimal 剩余金额;

    private boolean 身份验证(Object 提款卡, String 密码) {
        // 验证逻辑
        // 通过 返回 true
    }

    private void 吐钞() {
        // 哒哒哒哒哒哒
    }

    public void 提款(Object 提款卡, String 密码) {
        if (身份验证(提款卡, 密码) == true)
            吐钞();
    }

    public BigDecimal 查询余额(Object 提款卡, String 密码) {
        // 查询数据库余额 0
        if (身份验证(提款卡, 密码) == true)
            return 剩余金额;
        else
            return BigDecimal.ZERO;
    }
}
```


当然实际上更为复杂且严密(而且我对提款机不熟)，但在怎么复杂，使用上一般使用者只要知道使用哪些公开的方法就好(虽然不熟但我会领钱、查余额)，剩下的就是设计这个类别的设计师要负责的工作


## 常用修饰符 private 、 public


> private 私有



`private`是属性隐藏会普遍使用的修修饰符，开放权限最低，只有当前类中能够存取


> public 公开



与`private`相反，`public`是任何人都可以调用，通常用来表示这个方法可以供大家访问，一个`public`的方法内可以调用多个private的方法来实现需要的功能


## Getter 与 Setter


为了属性隐藏，我们常把重要属性设为`private`，要供别人(甚至自己)存取的时候，通常会利用`getter()`及`setter()`这种对外公开方法间接的存取。
来看个例子，学生类的属性有姓名、年龄，提供`setter`与`getter`方法


```java
public class Student {

    private String name;
    private int age = -1;

    public void setName(String name) {
        if (name == null || name.trim().length() == 0) {
            System.out.println("ERROR: 名字不能为空！");
        } else {
            this.name = name;
        }
    }

    public void setAge(int a) {
        if (a < 0) {
            System.out.println("ERROR: 年齡不能为负数！");
        } else {
            this.age = a;
        }
    }

    public String getName() {
        return name == null ? "无名氏" : this.name;
    }

    public int getAge() {
        return age;
    }

    @Override
    public String toString() {
        return "Student{" +
                "名字:'" + this.getName() + '\'' +
                ", 年龄:" + this.getAge() +
                '}';
    }
}
```


这是常见的设计方法，成员属性的部份都设为private，而公开了`setName()`及`setAge()`让别人调用来设定`name`及`age`的值，这就是通过公开方法间接的设定隐藏的属性值，好处是我这样写可以在设定属性值前先做一些前处理(以上述代码来说就是检查参数的合法性)。
在`getter`的部份，也公开了两个方法可以让别人存取到内部隐藏的属性，以`getName()`来说，可以在回传出去前多做一步处理(这里简单空判断) ，这样的设计方式是常见且容易维护的。


**测试代码**


```java
public class TestStudent {
    public static void main(String[] args) {

        Student s1 = new Student();
        s1.setName("源十天狗");
        System.out.println("s1设置年龄为-500");
        s1.setAge(-500);
        System.out.println("打印s1:==>"+ s1.toString());

        Student s2 = new Student();
        System.out.println("s2不设置名字");
        s2.setName(null);
        s2.setAge(18);

        System.out.println("打印s2:==>"+ s2.toString());

    }
}
```

**输出**


```java
s1设置年龄为-500
ERROR: 年齡不能为负数！
打印s1:==>Student{名字:'源氏舔狗', 年龄:-1}
s2不设置名字
ERROR: 名字不能为空！
打印s2:==>Student{名字:'无名氏', 年龄:18}
```


可以看到对象s1因为乱传参数，所以在`setter`被设定前被先检查出来，可以进一步增加程序的稳定性


