## 介绍  


Java中继承是一种机制，其中一个对象获取父对象的所有属性和行为。  
它是 `OOP（面向对象的编程系统）` 的重要组成部分。  
Java继承的思想是，您可以 `创建` 基于现有类构建的新类。  
从现有类继承时，可以 `复用` 父类的 `方法` 和 `字段` 。  
此外，您还可以在继承后的类中添加新的方法和字段
## 为什么需要继承


试想一种情况：  
有一个 Aminal (动物)，它的定义如下：  
```powershell
属性：
体重、身高、年龄  

方法:
移动
```
 ok，当我们这个类定义好之后，现在再来定义一个 Dog（狗）的类别：  
```powershell
属性：
体重、身高、年龄 、毛色

方法:
移动、吃、睡、吠叫  
```
现在我们发现狗类和动物类中定义的属性有很多重复。  
在现实中，狗是一种动物，应该拥有动物的属性及方法，然后再加上狗专属的属性和方法。  
以这个例子来说，我们可以把动物当成 `父类别(或称超类别super class)` ，狗 `继承` 动物，狗是 `子类别 subclass` 。  


**子类别会拥有父类别的所有属性、方法，再加上自己定义的属性及方法，所以可以说子类别是父类别的延伸(extend)。**  (tips：这句话超重要！多看个几十遍，想一想)   


总结两点： 


- 实现[方法重写](https://www.yuque.com/go/doc/34263211) 
- 提高代码的复用性



## 类别图


![image.png](https://cdn.nlark.com/yuque/0/2021/png/631242/1617760315566-22318ed5-3656-4282-959e-8ea7963e9be7.png#align=left&display=inline&height=259&margin=%5Bobject%20Object%5D&name=image.png&originHeight=400&originWidth=591&size=48414&status=done&style=shadow&width=382)


这是 `UML`  (统一建模语言，Unified Modeling Language) 的类别图，常用来描述类别之间的关系。  
实心箭头表示继承关系，由子类别指向父类别。  
图中读作 `Dog`  继承 `Animal` 。另外一种常见的说法是： `Dog is a Animal.` 
继承的概念用 `is a` 来表述。反过来说 `Animal is a Dog.`是不成立的，利用 `is a` 可以帮助思考。  


## 继承中使用的术语  


- Class：类是具有共同属性的一组对象。它是从中创建对象的模板或蓝图。
- Sub Class / Child Class：子类是继承其他类的类。也称为派生类，扩展类或子类。
- Super Class/ Parent Class：父类是子类从中继承要素的类。也称为基类或父类。
- Reusability：顾名思义，可重用性是一种机制，可在创建新类时方便您重用现有类的字段和方法。您可以使用在现有类中已经定义的相同字段和方法。  



## Java继承的语法  


```java
class Child extends Parent 
{  
   //methods and fields  
}  
```
`extends` 关键字表示正在新建从现有类派生的新类，`extends` 的意思是扩展。  
在Java术语中，被继承的类称为 `父类` 或 `超类` ，而新类称为 `子级` 或 `子类` 。


## Java继承示例


参照 `类别图` :  
```java
class Animal {
    int height;
    int weight;
    int age;

    void move() {
        System.out.println("移动 -> 移动");
    }
}
class Dog extends Animal {
    String hairColor = "金黄";
    void eat() {
    }

    void sleep() {
    }

    void bark() {
    }

    public static void main(String[] args) {
        Dog dog = new Dog();
        System.out.print("狗开始移动:");
        dog.move();
        System.out.println("狗的颜色:"+ dog.hairColor);
    }
}
```
输出：  
```java
狗开始移动:移动 -> 移动
狗的颜色:金黄
```
.
## Java中的继承类型  


在类的基础上，Java 中可以有三种继承类型：  

- 单继承
- 多级继承
-  阶级式继承

在Java编程中，仅通过 `接口` 支持 `多重继承` 和 `混合继承` ，之后我们将学习接口。


### 单继承 
![image.png](https://cdn.nlark.com/yuque/0/2021/png/631242/1617764475424-aa3cd544-ce50-4dec-ac0b-652eb3ee4290.png#align=left&display=inline&height=135&margin=%5Bobject%20Object%5D&name=image.png&originHeight=269&originWidth=244&size=9604&status=done&style=none&width=122)  
```java
class Person {
    void eat() {
        System.out.println("吃饭...");
    }
}
class Male extends Person {
    void speak() {
        System.out.println("中国话...");
    }
}
```
### 多级继承
![image.png](https://cdn.nlark.com/yuque/0/2021/png/631242/1617764606774-9b4df628-f86f-41a8-90c2-8d46d9371c10.png#align=left&display=inline&height=216&margin=%5Bobject%20Object%5D&name=image.png&originHeight=431&originWidth=269&size=16126&status=done&style=none&width=134.5)
```java
class Person {
    void eat() {
        System.out.println("吃饭...");
    }
}
class Male extends Person {
    void speak() {
        System.out.println("雄厚声...");
    }
}
class BabyBoy extends Male {
    @Override
    void speak() {
        System.out.println("嚎嚎大哭...");
    }
}
```
### 阶级式继承  
![image.png](https://cdn.nlark.com/yuque/0/2021/png/631242/1617765260842-f5fa735b-92b6-4497-bcc9-04ed456700da.png#align=left&display=inline&height=130&margin=%5Bobject%20Object%5D&name=image.png&originHeight=260&originWidth=508&size=22325&status=done&style=none&width=254)
```java
class Person {
    void eat() {
        System.out.println("吃饭...");
    }
}
class Male extends Person {
    void speak() {
        System.out.println("雄厚声...");
    }
}
class Female extends Person {
    void speak() {
        System.out.println("细细声...");
    }
}
```


## 为什么 Java 不支持混合继承  


为了降低复杂性并简化语言，java不支持多重继承。  
考虑一个场景，其中A，B和C是三个类别。 C类继承 `A和B` 类。  
如果A和B类具有相同的方法，并且您从子类对象调用它，则将有歧义来调用A或B类的方法。  
由于编译时错误比运行时错误要好，因此如果您继承2个类，则 `Java`  会呈现编译时错误。  
因此，无论您使用的是相同的方法还是不同的方法，都会出现编译时错误。  


```java
class A{  
void msg(){System.out.println("Hello");}  
}  
class B{  
void msg(){System.out.println("Welcome");}  
}  
class C extends A,B{ //假设可以运行  
   
 public static void main(String args[]){  
   C obj=new C();  
   obj.msg();// 不知道将要调用哪个msg()方法  
 }  
}  
```


## 万物之父 Object  
如图：
![](https://cdn.nlark.com/yuque/0/2021/jpeg/631242/1617772405795-064eb24e-0ab7-4a7d-8061-bc3027e3f0e4.jpeg#align=left&display=inline&height=377&margin=%5Bobject%20Object%5D&originHeight=377&originWidth=593&size=0&status=done&style=none&width=593)


我们知道Java是面向对象的语言，而每个类都继承Object。  
定义类的时候，如果没有使用关键字 `exyends` ,Java会自行继承  `extends Object` :  


```java
class Animal{
    // code
}
// 等价于下面代码中，Java会自动帮你extends Object
class Animal extends Object{
    // code
}
```
## 关键字 this、super


### this
> 指到自己类别的成员。

```java
class Human{
    String name;
    int age;
    Human(String str){
        this.name = str;
    }
    String getName(){
        return this.name;
    }
}
```
上述程式中， this.name意思是 `自己这个类别的成员name` ，当然在这个情况 `不写也无所谓` ，但继承关系越 `复杂` 的情况下这样写法可以大大增加代码的 `可读性` 。  


> 调用构造方法 this(.); 



如果写了很多构造提供多元的建构物件方式，构造之间彼此可以互相调用  
```java
class Human{
    String name;
    int age;
    static int totalCount = 0;
    Human(){
        name = "untitled";
        age = -1;
        totalCount++;
    }
    Human(String str){  
        this();                          
        this.name = str;
    }
    Human(String str,int a){
        this(str);  
        this.age = a;
    }
    void printInfo(){
        System.out.println(name+" 年齡："+age+" 总人数："+totalCount);
    }
}
```


上述程式中， `this()` 表示调用无参构造方法， `this(String)` 表示调用带有一个字串参数的构造方法，以此类推。  


这样写的好处是，各构造之间有功能扩充的效果，已经写好的程式可以被充分的再利用，要修改某个环节也比较不会出错。  


**tips:** 


`this(.)` 只能放在方法体内第一行！！！
```java
Human(String str){  // 编译错误，要把方法体内两行位置互换
    this.name = str;
    this();        // 要等构造初始化完成，才能做最后的决定
}
```
好，那用定义好的构造来测试一下程序：  
```java
class TestHuman {
    public static void main(String[] args) {
        Human h1 = new Human();
        h1.printInfo();
        Human h2 = new Human("铅华");
        h2.printInfo();
        Human h3 = new Human("小花", 18);
        h3.printInfo();
    }
}
```
执行结果：  
```java
untitled 年齡：-1 目前總人數：1
铅华 年齡：-1 目前總人數：2
小花 年齡：18 目前總人數：3
```
### super
指到父类别，使用方法跟 `this` 相似，一样要放到第一行。  
使用代码测试一下：  
```java
class Parent {
    int money = 100;

    public Parent(int money) {
        this.money -= money;
    }

    static class Child extends Parent {
        public Child(int money) {
            super(money);
            System.out.println("儿子花了爸爸" + money + "元钱后剩余" + this.money);
        }
    }

    public static void main(String[] args) {
        new Child(10);
    }
}
```
执行结果：
```java
儿子花了爸爸10元钱后剩余90
```
## 层层初始化  


举个例子：  


![](https://cdn.nlark.com/yuque/0/2021/jpeg/631242/1617774884048-37eab656-13d4-45e5-afdc-0e7aae50d30c.jpeg#align=left&display=inline&height=188&margin=%5Bobject%20Object%5D&originHeight=188&originWidth=105&size=0&status=done&style=none&width=105)


```java
class A{
    A(){
        System.out.println("A的构造....");
    }
}
class B extends A{
    B(){
        System.out.println("B的构造....");
    }
}
class C extends B{
    C(){
        System.out.println("C的构造....");
    }
}
```
新建一个 `C` 对象试一试：
```java
class Test {
    public static void main(String[] args) {
        C c = new C();
    }
}
```
执行结果：  
```java
A的构造....
B的构造....
C的构造....
```
示意图：  
![](https://cdn.nlark.com/yuque/0/2021/jpeg/631242/1617775010273-e46afa72-d4aa-4f9b-bbdb-e56dd3f9b2c7.jpeg#align=left&display=inline&height=261&margin=%5Bobject%20Object%5D&originHeight=261&originWidth=559&size=0&status=done&style=none&width=559)


我们要建构的是 `C` ，而 `C` 是 `B` 的延伸，所以要先有 `B` ，而 `B` 是 `A` 的延伸，所以要先有 `A` ，而 `A` 是 `Object` 的延伸，所以要先有 `Object` ，于是就从最顶端的父类别一直建构下来。  
好，现在我知道需要从父类别初始化下来，但构造呢？一个类别可以定义无数个构造，他怎么知道我要用哪个构造方法来构造我的对象？到底是以什么机制来构造父类的？
嗯，回想一下，当初在定义类的时候，如果没有定义任何构造方法，Java会帮你定义一个不带参数不做任何事的构造方法，现在同样的老招又来一次！
只要你的构造方法中 `没有调用其他构造方法` ，就会在 `第一行` 偷偷帮你加上去一个 `super(); ` 有多偷偷呢？你连看都看不到！ ！但他就是存在于最后的程序代码中。  


以上的程式来说，就像这样：
```java
class A{
    A(){
        super();  // 这行不写的话，Java会帮你加上，但你看不到
        System.out.println("这里是A的构造方法");
    }
}
class B extends A{
    B(){
        super();  // 这行不写的话，Java会帮你加上，但你看不到
        System.out.println("这里是B的构造方法");
    }
}
class C extends B{
    C(){
        super();  // 这行不写的话，Java会帮你加上，但你看不到
        System.out.println("这里是C的构造方法");
    }
}
```
好的，现在知道他会自动帮我调用 `super();` 来建构父类别，但是如果我不想用这个· `无参构造` 呢？我辛苦设计那么多 `构造方法` ，他只会帮我调用 `无参构造` ，太惨了吧！
嗯嗯，没错就是这么惨，所以如果要调用 `有参数的super(.);` 你就要自己写！
观察下述代码，想想执行结果：  
```java
class ClassA {
    ClassA() {
        System.out.println("这里是A的构造方法...");
    }
}
class ClassB extends ClassA {
    ClassB() {
        System.out.println("这里是B的构造方法...");
    }

    ClassB(String str) {
        this();
        System.out.println("B：hello " + str);
    }
}
public class ClassC extends ClassB{
    ClassC() {
        this("tina");
        System.out.println("这里是C的构造方法...");
    }

    ClassC(String str) {
        super(str);
        System.out.println("C: hello "+ str);
    }

    public static void main(String[] args) {
        new ClassC();
    }
}
```
执行结果：
```java
这里是A的构造方法...
这里是B的构造方法...
B：hello tina
C: hello tina
这里是C的构造方法...
```
如果跟你想的不一样，在重新看一下上面的描述再想想，哪里不懂可以查看原文问我。这里是重要的 `继承理念` 。  
## 存取修饰符 protected


在存取修饰符的章节提过，现在刚好提到继承再拿出来讨论。
`protected` 是个关键字，开放的最大权限为 `不同包的子类别` 可以存取。
假设 `Animal`  与 `Dog`  位在不同 `package` ，先看 `Animal` 的代码：  
```java
 package A;
 public class Animal {
     public String name;  // 4个属性刚好4种权限范围都做测试
     protected int height;
     int weight;
     private int age;
     // ↓这个修饰子一定要public或protected，不然不同类别的Dog不能用他来构造对象
     public Animal(String str,int h,int w,int a){
         this.name = str;
         this.height = h;
         this.weight = w;
         this.age = a;
     }
 }
```
再看 `Dog` 的代码：
```java
 package B;
 import A.Aminal;
 public class Dog extends Animal{
     String color;
     public Dog(String str,int h,int w,int a,String c){
         super(str,h,w,a);
         this.color = c;
     }
     public void printInfo(){
         System.out.println(name);    // OK, public 不同包也可以存取
         System.out.println(height);  // OK, protected 允许不同包的子类别存取
         System.out.println(weight);  // 编译错误，预设只有同包可以存取
         System.out.println(age);     // 编译错误，private 只有自身类中能存取
         System.out.println(color);   // OK, 当前类成员当然ok
     }
 }
```


## 重写的存取修饰符限制


> 上面的例子有提到过重写(override)，这边再详细讨论一下，以及一些限制。  



在继承中关系，父类别定义了一些方法，子类别觉得不适用的话可以 `覆盖` 掉父类别的方法，然后 `重写` 属于自己的方法。
举个例子:  
```java
class A{
    void printInfo(){
        System.out.println("hello, I am A.");
    }
}
class B extends A{
    void printInfo(){
        System.out.println("hello, I am B.");
    }
}
class C extends A{
}
```
测试代码：  
```java
class Test {
    public static void main(String[] args) {
        B b = new B();
        b.printInfo();
        C c = new C();
        c.printInfo();
    }
}
```
执行结果：  
```
hello, I am B.
hello, I am A.
```
上述程式中， `B` 与 `C` 都是继承 `A` ，表示拥有了 `A` 所有的成员，但 `B` 重写了 `printInfo()` 方法，而 `C` 没有。所以在调用的时候， `对象B` 会使用 `B` 类别重写的方法，而 `对象C` 因为 `C` 类没有自己定义重写，所以会使用到父类 `A` 所定义的 `printInfo()` 。
好，那来谈谈 `重写` 的 `限制` 。


**要重写父类方法必须满足几个条件：**

- 父类方法不能用 final 修饰。
- 子类重写的方法名称、回传型态、参数个数顺序需相同。
- 子类重写的方法，其修饰符权限不能小于父类方法。

**第一点，用final修饰的方法无法被重写。**
这是关键字final修饰方法的特性，详细内容于后面讨论。  
```java
class A{
    //       (↓关键字 final)
    public final void printInfo(){
        System.out.println("hello, this is A.");
    }
}
class B extends A{
    // 编译错误  ↓ 利用final修飾的方法不能被重写。
    public void printInfo(){
        System.out.println("hello, this is B;");
    }
}
```
在 `A类`  的 `printInfo()` 方法利用 `关键字 final`  修饰，所以任何继承他的子类别都不能重写这个方法，否则会产生编译错误： `Cannot override the final method from A` .
**第二点，方法名称、回传型态、参数个数必须相同。**
嗯，如果不一样的话，就是自己再定义一个新方法了阿！ ！跟重写有什么关系 XD  


```java
class A{
    public void printInfo(){
        System.out.println("hello, this is A.");
    }
}
class B extends A{
    public void printInfo2(){
        System.out.println("hello Tina, nice to meet you <3");
    }
}
```
恩，就是多定义一个方法，没什么好说的，这根本不是重写。  


**第三点，子类方法修饰符权限不能小于父类方法。**
简单来说，如果父类说这个方法是对 `全世界公开(public)` 的方法，你要重写就不能 `占为己有(private)` 。
tips: 存取修饰符的开放权限从大到小： `public`  -> `protected`  -> `(no modifier)`  -> `private` 
如果父类说此方法是 `protected` ，那子类重写时的修饰符必须是 `public` 或 `protected` 。
如果父类说此方法是 `private` ，那子类重写时的修饰符必须是 `public` 或 `protected` 或 `(no modifier)` 或 `private` 。
**关键是权限的开放范围不得小于重写对象。**


```java
class A{
    // 注意修饰符是(no modifier)
    void printInfo(){
        System.out.println("hello, this is A.");
    }
}
class B extends A{
    // ↓ 编译错误，子类重写方法修饰符权限小于父类方法
    private void printInfo(){
        System.out.println("hello, this is B.");
    }
}
```
在 `A类` 中的 `printInfo()` 方法修饰子是 `(no modifier)` ，依据重写的开放权限规则， `B类` 继承了 `A类` 想重写 `printInfo()` ，重写的开放权限必须为 `public` 或 `protected` 或 `( no modifier)` ，重点就是不能小于重写对象，否则会发生编译错误： `Cannot reduce the visibility of the inherited method from A` .
![bottom.png](https://cdn.nlark.com/yuque/0/2021/png/631242/1617757324069-4901cab7-1364-4b8c-9c3c-fea510ec6b60.png#align=left&display=inline&height=251&margin=%5Bobject%20Object%5D&name=bottom.png&originHeight=251&originWidth=748&size=24850&status=done&style=none&width=748)
