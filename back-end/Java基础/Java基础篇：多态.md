

## 介绍  
多态就是指一个类实例的相同方法在不同情形有不同表现形式，在面向对象设计的概念中，对于父类提供的方法调用，子类可以有自己特有的行为。  
## 例子
```java
class Animal {
    void move() {
        System.out.println("move...move...");
    }
}
class Dog extends Animal {
    void move() {
        System.out.println("跑...跑...");
    }
}
class Bird extends Animal {
    void move() {
        System.out.println("飞...飞...");
    }
}
class 源氏 extends Animal {
    void move() {
        System.out.println("爬...爬...");
    }
}
```
声明一个 `Animal`  类，然后创建 `Dog` 、 `Brid` 、 `Fish`  类来继承 ` Animal ` 类

![poly](http://images.zabbix.store/images/poly.jpg)
还记得继承关系可以用 ` IS-A ` 来表述吗？我可以说 `Dog is a Animal`  或 `Bird is a Animal`  或 ` Fish is a Animal `  这是OK且符合逻辑的。
好，那现在我有4只动物，是什么动物不管，我就把它们都当成动物就好。我知道动物里面有一个 `move()` 的方法，我让每只动物都使用这个 `move()` 的方法。
程序如下： 

```java
class Test {
    public static void main(String[] args) {
        Animal a =new Animal();
        Animal b =new Dog();
        Animal c =new Bird();
        Animal d =new Fish();
        a.move();
        b.move();
        c.move();
        d.move();
    }
}
```


`变量a` 看起来OK，声明是 `Animal` 且也用 `Animal` 的 `构造函数` 去初始化。
`变量b` 看起来就怪怪的，用 `Dog()` 来初始化的话不是应该声明成 `Dog` 型态吗？是的，那样写也OK，我们知道依据继承关系， `Dog is a Animal` 所以我这样写也并非违反逻辑。利用 `Dog()` 构造方法生成的对象，理当拥有 `Dog` 类定义的所有成员，但不管，现在我们只把这个物件当作Animal来看。
`变数c` ，不管你怎么构造你的对象，我都会用 `Animal` 的角度去看你。
`变数d` ：本体是 `Fish` ，但有人把我当成动物。 (变数 `b,c,d` 是差不多情况)
好，现在我不管它们4个的 `本质` 是什么，我只知道我把它们都当做 `Animal`  来看，而我知道 `Animal`  里面有定义一个方法叫做 `move()` ，所以把4只 `Animal` 的 `move()` 都调用看看。  
执行结果：
```java
move...move...
跑...跑...
飞...飞...
游...游...
```
只要可以视为 `Animal` 的对象，就可以使用这个方法而不会出错。这样的设计方式可以 **降低方法定义对类的依赖** ，使用一个制定好的介面，利用该介面来操作不同的对象，增加代码的复用性，架构设计上也比较好


## 类型转换


只能向上转型，例如可以从子类转换为父类，因为子类中存在的方法父类中也存在，当然除了 `private` 修饰的，但是 `子类可以扩展` 自己的属性与方法，所以不能把父类强转为子类


### 向上转型  
```java
Dog d = new Dog();
Animal a1 = d;  // Java帮你作了型态转换，但你看不到，等价于下行
Animal a2 = (Animal)d;  // 也可以自己写
```
### 向下转型
```java
Animal ani = new Animal();
Dog d = (Dog)ani;  // 父类强转为子类
```
执行结果：  
```java
Exception in thread "main" java.lang.ClassCastException:
Animal cannot be cast to Dog
```
tips：编译会过，执行会错，切记！
