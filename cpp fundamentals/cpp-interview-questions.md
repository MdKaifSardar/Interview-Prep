# C++ Fundamentals & Interview Master List (65 Questions)

**Track:** Comprehensive C++ Technical Interviews & Written Coding Exams (Core Mechanics, Tricky Details, STL, & Algorithms)

---

## Legend

**Priority** — 🔴 P0 Essential (Must know for technical rounds & written tests) · 🟠 P1 Important (Second pass / deeper concepts) · 🟡 P2 Advanced / Edge Cases

**Type** — [C] Conceptual Mechanic · [Q] Syntax & Implementation · [P] Pitfall / Tricky Detail / Undefined Behavior · [D] Problem Solving & Algorithm

---

## 1. Pointers, References, & Const Qualifiers

1. 🔴 P0 [C] What is the difference between `const int* p`, `int* const p`, and `const int* const p`? How do you parse them using the right-to-left rule?
2. 🔴 P0 [C] How do pointers (`T*`) and references (`T&`) differ in memory representation, nullability, re-binding, and syntax?
3. 🔴 P0 [P] What are dangling pointers, wild pointers, and null pointers? Why does returning a reference or pointer to a local stack variable cause undefined behavior?
4. 🟠 P1 [C] What is reference collapsing, and how does `const T&` bind to and extend the lifetime of a temporary rvalue?

---

## 2. Memory Management, Allocation, & Smart Pointers (RAII)

5. 🔴 P0 [C] What is RAII (Resource Acquisition Is Initialization), and why is it fundamental to exception safety and deterministic cleanup in C++?
6. 🔴 P0 [P] What happens if you allocate memory using `int* arr = new int[10];` but deallocate it with `delete arr;` instead of `delete[] arr;`?
7. 🔴 P0 [Q] What are `std::unique_ptr` and `std::shared_ptr`? How do their ownership models, control block overhead, and copy/move semantics differ?
8. 🟠 P1 [C] What is a circular reference issue with `std::shared_ptr`, and how does `std::weak_ptr` break the ownership cycle?
9. 🟠 P1 [Q] Why should you prefer `std::make_unique` and `std::make_shared` over raw `new` calls when instantiating smart pointers?

---

## 3. Object Lifecycle, Constructors, & Rule of 0/3/5

10. 🔴 P0 [C] What are the Rule of 0, Rule of 3, and Rule of 5 in C++? What are the 5 special member functions?
11. 🔴 P0 [Q] Why should single-argument constructors be marked `explicit`? Give an example of an implicit conversion bug prevented by `explicit`.
12. 🔴 P0 [C] What is the exact execution order of base class vs derived class constructors and destructors, and why are member initializers executed in class declaration order rather than initializer list order?
13. 🟠 P1 [Q] What is the difference between `= default;` and `= delete;` specifiers on special member functions?

---

## 4. Value Categories, Move Semantics, & Copy Elision

14. 🔴 P0 [C] What are lvalues, rvalues, glvalues, prvalues, and xvalues in C++11/C++17? Give concrete examples of each.
15. 🔴 P0 [Q] What is an rvalue reference (`T&&`), what does `std::move()` actually do under the hood, and does `std::move()` move data by itself?
16. 🔴 P0 [C] What is Copy Elision (RVO and NRVO)? When is copy elision guaranteed by the compiler in C++17?
17. 🟠 P1 [P] Why is writing `return std::move(local_obj);` in a return statement often an anti-pattern that inhibits RVO?

---

## 5. Types, Casting Operators, & Type Deduction

18. 🔴 P0 [C] Compare C++ four named casts: `static_cast`, `const_cast`, `reinterpret_cast`, and `dynamic_cast`. When should each be used?
19. 🔴 P0 [P] Why is C-style casting `(TargetType)val` dangerous in C++ compared to explicit C++ named casts?
20. 🔴 P0 [Q] How does `auto` type deduction work, why does `auto x = {1, 2};` deduce `std::initializer_list<int>`, and how does `decltype(auto)` differ from `auto`?
21. 🟠 P1 [C] What are implicit narrowing conversions (e.g. `double` to `int`), and how does uniform brace initialization `{}` prevent them at compile time?

---

## 6. Undefined Behavior (UB), Sequence Points, & Silent Traps

22. 🔴 P0 [P] What is Undefined Behavior (UB) in C++? How does UB differ from implementation-defined behavior and unspecified behavior?
23. 🔴 P0 [P] Why does `i = i++ + ++i;` or modifying a variable twice between sequence points cause UB?
24. 🔴 P0 [P] What is the `size_t` unsigned integer underflow pitfall in backward loops (e.g. `for (int i = v.size() - 1; i >= 0; i--)` when `v.empty()`), and how do you write signed-safe loop headers?
25. 🔴 P0 [P] What is signed integer overflow UB (e.g. `INT_MAX + 1`), and why can optimizing compilers erase overflow checks assuming signed overflow never happens?

---

## 7. Functions, Lambdas, & Preprocessor Macros

26. 🔴 P0 [Q] How do lambda capture lists work (`[]`, `[=]`, `[&]`, `[x, &y]`), and why are variables captured by value `const` inside a lambda unless marked `mutable`?
27. 🔴 P0 [P] What are the hidden traps of `#define SQUARE(x) x * x` (e.g. `SQUARE(1 + 2)`), and why should `inline` functions or `constexpr` be preferred?
28. 🔴 P0 [Q] How do default function arguments work, in which file (header vs source) must they be declared, and why can't they depend on local variables?
29. 🟠 P1 [C] What is Function Overloading Resolution in C++, and how does C++ resolve ambiguous overloads between exact matches, promotions, and standard conversions?

---

## 8. Object-Oriented Programming & Virtual Dispatch Mechanics

30. 🔴 P0 [C] How does virtual function dynamic dispatch work under the hood using vtable (Virtual Method Table) and vptr (Virtual Pointer)?
31. 🔴 P0 [P] Why MUST a base class destructor be declared `virtual` if derived objects are deleted through a base class pointer (`Base* b = new Derived(); delete b;`)?
32. 🔴 P0 [Q] What is the purpose of `override` and `final` specifiers in C++11/17, and what silent bugs do they prevent?
33. 🟠 P1 [C] What happens if you call a virtual function inside a base class constructor or destructor? Does dynamic dispatch execute the derived override?

---

## 9. STL Containers & Inner Mechanics (Vectors, Strings, Maps)

34. 🔴 P0 [Q] How does `std::vector` manage internal capacity growth (growth factor 1.5x/2x)? What is iterator invalidation, and when does `push_back()` invalidate iterators?
35. 🔴 P0 [Q] What are the differences between `std::unordered_map` and `std::map` regarding underlying data structures (hash table vs red-black tree), worst-case search complexity (`O(N)` vs `O(log N)`), and element ordering?
36. 🔴 P0 [P] What unexpected side-effect occurs when reading a non-existent key using `map[key]`, and how do `map.find()` or `map.count()` prevent accidental insertion?
37. 🔴 P0 [Q] What are the exact signatures, parameters, and return types for `s.length()`, `s.substr(pos, len)`, `s.find(sub)`, `s.push_back(ch)`, `s.erase()`, and `s.insert()`?
38. 🔴 P0 [Q] How do `std::to_string()` and `std::stoi()` work, and what exceptions can `std::stoi()` throw (`std::invalid_argument`, `std::out_of_range`)?
39. 🟠 P1 [Q] What is `std::vector::reserve()` vs `std::vector::resize()`, and how does `reserve()` optimize memory allocations?
40. 🟠 P1 [Q] What is the Small String Optimization (SSO) in `std::string`?

---

## 10. Containers & Adapters (`std::stack`, `std::queue`, `std::pair`, Linked Lists)

41. 🔴 P0 [Q] What are the member functions and operation complexities for `std::stack<T>`, `std::queue<T>`, and `std::pair<T1, T2>`?
42. 🔴 P0 [P] What occurs if you call `.top()` or `.pop()` on an empty `std::stack`, or `.front()` on an empty `std::queue`? How do you write defensive empty checks?
43. 🔴 P0 [Q] How do you define a standard `struct Node` for a singly linked list with constructor initialization lists in C++?
44. 🔴 P0 [Q] What is the "Dummy Head Node" pattern, and why does initializing `Node dummy(0); Node* tail = &dummy;` eliminate null-pointer edge cases in linked list code?
45. 🟠 P1 [Q] How do C++17 structured bindings (`auto [x, y] = p;`) simplify tuple and pair unpacking?

---

## 11. Standard Algorithms, Iterators, & Fast I/O

46. 🔴 P0 [Q] What is the exact syntax of `std::sort` for ascending order, descending order (`greater<T>()`), and custom comparator lambda functions on vectors and arrays?
47. 🔴 P0 [P] Why must custom comparators in `std::sort` satisfy *Strict Weak Ordering* (returning `false` for equal elements), and why does using `<=` cause segmentation faults during sorting?
48. 🔴 P0 [Q] How do `std::reverse`, `std::min`, `std::max`, `std::swap`, `std::accumulate`, `std::count`, and `std::find` work across raw arrays and `std::vector`?
49. 🔴 P0 [Q] What are the exact Fast I/O statements in C++ (`ios_base::sync_with_stdio(false); cin.tie(NULL);`), and how does `cin >> ws` resolve newline buffer traps?

---

## 12. Core Coding Problems (Written & Technical Exam Focus)

50. 🔴 P0 [D] **Climbing Stairs**: How do you implement dynamic programming with `O(1)` extra space without vector overhead?
51. 🔴 P0 [D] **N-th Tribonacci Number**: How do you maintain state rolling variables `T0, T1, T2` cleanly in a single loop?
52. 🔴 P0 [D] **Roman to Integer**: How do you parse Roman numeral subtraction rules (e.g. `IV`, `IX`) scanning left-to-right or right-to-left?
53. 🔴 P0 [D] **Integer to Roman**: How do you convert integers to Roman numerals using pre-defined greedy arrays of values and symbols?
54. 🔴 P0 [D] **Valid Parentheses**: How do you process character matching using `std::stack<char>` with strict stack-empty guards before calling `.top()`?
55. 🔴 P0 [D] **Best Time to Buy and Sell Stock**: How do you compute maximum profit in a single pass tracking minimum price and maximum difference?
56. 🔴 P0 [D] **Sort Linked List**: How do you split a linked list using Fast & Slow pointers and merge two sorted sublists?
57. 🔴 P0 [D] **Remove Linked List Elements**: How do you delete all nodes containing a specific target value using a Dummy Head node and explicit `delete` calls?
58. 🔴 P0 [D] **Count Pairs with Given Sum**: How do you count pairs summing to target in an array using sorting and Two Pointers without hash map overhead?

---

## 13. Tricky Snippet Diagnostics & Self-Test Verification

59. 🔴 P0 [P] **Diagnostic 1**: What is the output of the following code and why?
    ```cpp
    int a = 5; int& ref = a; int b = 10; ref = b; ref = 20;
    std::cout << a << " " << b;
    ```
60. 🔴 P0 [P] **Diagnostic 2**: What happens when this code is executed?
    ```cpp
    std::vector<int> v = {1, 2, 3};
    for (auto it = v.begin(); it != v.end(); ++it) {
        if (*it == 2) v.push_back(4);
    }
    ```
61. 🔴 P0 [P] **Diagnostic 3 (Object Slicing)**: What is printed by this snippet?
    ```cpp
    struct Base { virtual void print() { std::cout << "Base"; } };
    struct Derived : Base { void print() override { std::cout << "Derived"; } };
    Derived d; Base b = d; b.print(); Base* p = &d; p->print();
    ```
62. 🔴 P0 [P] **Diagnostic 4 (Non-Virtual Destructor Leak)**: Explain the bug in the following snippet:
    ```cpp
    struct Base { ~Base() {} };
    struct Derived : Base { int* arr = new int[100]; ~Derived() { delete[] arr; } };
    Base* ptr = new Derived(); delete ptr;
    ```
63. 🔴 P0 [P] **Self-Test 1 (2D Vector Init)**: Fill in the blank to initialize a 2D vector `grid` of size `R x C` filled with `-1`:
    `vector<vector<int>> grid(____, vector<int>(____, ____));`
64. 🔴 P0 [P] **Self-Test 2 (Custom Sort Lambda)**: Complete the comparator lambda to sort `vector<pair<int, int>> vec` descending by `.second`:
    `sort(vec.begin(), vec.end(), [](const auto& a, const auto& b) { return ________; });`
65. 🔴 P0 [P] **Self-Test 3 (Dynamic Cast Safety)**: Fill in the blank to safely cast a `Base* b` pointer to a `Derived* d` pointer at runtime:
    `Derived* d = ____<Derived*>(b); if (d != nullptr) { ... }`

---
