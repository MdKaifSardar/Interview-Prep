# C++ Fundamentals & STL Syntax — Pre-Exam Revision Handbook

> A pure C++ fundamentals and STL syntax cheat sheet. Designed for quick review of function signatures, parameter syntax, return types, character/ASCII processing, containers, and memory gotchas.

---

## Quick Navigation Index
1. [Character & ASCII Processing (`<cctype>`)](#1-character--ascii-processing-cctype)
2. [`std::string` Complete Reference (`<string>`)](#2-stdstring-complete-reference-string)
3. [`std::vector` & Arrays (`<vector>`)](#3-stdvector--arrays-vector)
4. [Hash Maps & Maps (`<unordered_map>`, `<map>`)](#4-hash-maps--maps-unordered_map-map)
5. [Sets & Priority Queues (`<unordered_set>`, `<set>`, `<queue>`)](#5-sets--priority-queues-unordered_set-set-queue)
6. [Stack, Queue, Pair & Tuple (`<stack>`, `<queue>`, `<utility>`, `<tuple>`)](#6-stack-queue-pair--tuple-stack-queue-utility-tuple)
7. [`<algorithm>` & `<numeric>` Essential Functions](#7-algorithm--numeric-essential-functions)
8. [Pointers, References, Const Qualifiers, & Struct Syntax](#8-pointers-references-const-qualifiers--struct-syntax)
9. [Fast I/O, Buffer Flushing, & String Tokenization](#9-fast-io-buffer-flushing--string-tokenization)
10. [Numeric Limits, Math Functions, & Overflow Prevention (`<climits>`, `<cmath>`)](#10-numeric-limits-math-functions--overflow-prevention-climits-cmath)

---

## 1. Character & ASCII Processing (`<cctype>`)

### Function Signatures & Behavior

```cpp
#include <cctype> // Required header

char c = 'a';

bool isalpha(int ch);  // Returns true (non-zero) if 'a'-'z' or 'A'-'Z'
bool isdigit(int ch);  // Returns true (non-zero) if '0'-'9'
bool isalnum(int ch);  // Returns true (non-zero) if letter or digit
bool isspace(int ch);  // Returns true (non-zero) if ' ', '\n', '\t', '\r'
bool isupper(int ch);  // Returns true (non-zero) if 'A'-'Z'
bool islower(int ch);  // Returns true (non-zero) if 'a'-'z'

int tolower(int ch);   // Returns lowercase char if uppercase; else returns ch unchanged
int toupper(int ch);   // Returns uppercase char if lowercase; else returns ch unchanged

// Example usage:
char low = tolower('A'); // 'a'
char up  = toupper('b'); // 'B'
```

### ASCII Math & Indexing Cheat Sheet

| Operation | Formula / Snippet | Output Example |
| :--- | :--- | :--- |
| **Digit char to `int`** | `int val = c - '0';` | `'7' - '0'` $\rightarrow$ `7` |
| **`int` (0-9) to `char`** | `char c = val + '0';` | `5 + '0'` $\rightarrow$ `'5'` |
| **Char to 0-25 index (Lowercase)** | `int idx = c - 'a';` | `'c' - 'a'` $\rightarrow$ `2` |
| **0-25 index to Lowercase Char** | `char c = idx + 'a';` | `2 + 'a'` $\rightarrow$ `'c'` |
| **Char to 0-25 index (Uppercase)** | `int idx = c - 'A';` | `'C' - 'A'` $\rightarrow$ `2` |
| **Case-Insensitive Indexing** | `int idx = tolower(c) - 'a';` | `'B'` $\rightarrow$ `'b' - 'a'` $\rightarrow$ `1` |

### Frequency Array Indexing Syntax

```cpp
// 1. Fixed array for lowercase 'a'-'z'
int freq[26] = {0};
string s = "leetcode";

for (char c : s) {
    if (isalpha(c)) {
        freq[tolower(c) - 'a']++; // Increment count at 0-25 index
    }
}
// Read count of 'e': freq['e' - 'a']

// 2. Fixed array for full ASCII (256 characters)
int ascii_freq[256] = {0};
for (char c : s) {
    ascii_freq[(unsigned char)c]++;
}
```

> ⚠️ **Don't Forget:** `tolower()` and `toupper()` take and return `int` ASCII values. When assigning back to a character variable, cast implicitly or store directly into `char c = tolower(ch);`.

---

## 2. `std::string` Complete Reference (`<string>`)

### 1. Length & Inspection

```cpp
#include <string>

string s = "Hello World";

s.length(); // Returns size_t (number of characters) -> 11
s.size();   // Equivalent to length() -> 11
s.empty();  // Returns bool: true if s.length() == 0
s.front();  // Returns reference to first char ('H')
s.back();   // Returns reference to last char ('d')
```

### 2. Substring Extraction

```cpp
// Syntax: s.substr(size_t pos = 0, size_t count = npos)
string s = "Programming";

string sub1 = s.substr(0, 4); // "Prog" (Starts at index 0, length 4)
string sub2 = s.substr(4);    // "ramming" (From index 4 to end)
```

> ⚠️ **CRITICAL GOTCHA:** The 2nd argument of `substr()` is **LENGTH (count)**, NOT the ending index!  
> To get characters from `start_idx` to `end_idx` inclusive, use `s.substr(start_idx, end_idx - start_idx + 1)`.

### 3. Searching Substrings & Chars

```cpp
string s = "hello world";

size_t pos = s.find("world"); // Returns 6 (starting index)
size_t p2  = s.find('o');     // Returns 4 (first occurrence of 'o')
size_t p3  = s.find('z');     // Returns string::npos (Not found!)

// MUST-KNOW CHECK FOR SEARCH FAILURES:
if (s.find("abc") == string::npos) {
    // "abc" was NOT found in s
}

// Search backwards:
size_t last_o = s.rfind('o'); // Returns 7
```

### 4. Modification Methods

```cpp
string s = "cat";

s.push_back('s');         // "cats" (Appends single char)
s.pop_back();             // "cat"  (Removes last char)
s += " dog";              // "cat dog" (Appends string)
s.append(" fast");        // "cat dog fast"

// Erase syntax: s.erase(pos, count)
string s2 = "abcdef";
s2.erase(2, 3);           // "abf" (Removes 3 chars starting at index 2)

// Insert syntax: s.insert(pos, string)
string s3 = "ac";
s3.insert(1, "b");        // "abc" (Inserts "b" at index 1)

// Replace syntax: s.replace(pos, count, string)
string s4 = "hello world";
s4.replace(6, 5, "there"); // "hello there"

s.clear();                // Empties string (size becomes 0)
```

### 5. String <-> Number Conversions

```cpp
#include <string>

// 1. Number to String
string s1 = to_string(123);     // "123"
string s2 = to_string(3.14159); // "3.141590"
string s3 = to_string(-45LL);   // "-45"

// 2. String to Number
int val1       = stoi("42");          // 42
long long val2 = stoll("9999999999"); // 9999999999LL
double val3    = stod("3.14");        // 3.14
```

> ⚠️ **Don't Forget:** `stoi()` throws `std::invalid_argument` if string contains no digits, and `std::out_of_range` if the value exceeds integer bounds.

---

## 3. `std::vector` & Arrays (`<vector>`)

### Declarations & Initializations

```cpp
#include <vector>

vector<int> v1;                    // Empty vector
vector<int> v2(5, 0);              // Size 5, filled with 0 -> [0, 0, 0, 0, 0]
vector<int> v3 = {10, 20, 30};     // Initializer list -> [10, 20, 30]

// 2D Grid Initialization (R rows, C columns filled with val):
int R = 3, C = 4, val = -1;
vector<vector<int>> grid(R, vector<int>(C, val)); // 3x4 grid of -1

// Fixed C-style Array Initializations
int arr[5] = {0};                  // 1D array filled with 0
int matrix[3][4] = {{0}};          // 2D array filled with 0
```

### Element Access & Modifications

```cpp
vector<int> v = {10, 20, 30};

v[0];                   // 10 (No bounds checking)
v.at(0);                // 10 (Throws std::out_of_range if index invalid)
v.front();              // 10
v.back();               // 30
v.size();               // 3

v.push_back(40);        // [10, 20, 30, 40]
v.pop_back();           // [10, 20, 30]
v.emplace_back(50);     // Constructs element in-place at the end

// Resizing vs Reserving:
v.reserve(100);         // Pre-allocates capacity to 100 without changing size()
v.resize(5, 0);         // Changes size() to 5, filling new slots with 0

// Erasing elements by iterator:
v.erase(v.begin() + 1); // Erases element at index 1
v.erase(v.begin(), v.begin() + 2); // Erases range [0, 2)
v.clear();              // Empties vector (size becomes 0)
```

---

## 4. Hash Maps & Maps (`<unordered_map>`, `<map>`)

### `unordered_map` (Hash Table) vs `map` (Red-Black Tree)

| Feature | `unordered_map<K, V>` | `map<K, V>` |
| :--- | :--- | :--- |
| **Header** | `#include <unordered_map>` | `#include <map>` |
| **Ordering** | Unordered (hash-based) | Sorted by Key ascending |
| **Search Time** | `O(1)` average, `O(N)` worst | `O(log N)` guaranteed |
| **Key Requirement** | Hashable type | `<` (less-than) operator |

### Insertion & Safe Lookup Syntax

```cpp
#include <unordered_map>

unordered_map<string, int> counts;

// 1. Insertion / Assignment
counts["apple"] = 3;
counts.insert({"banana", 5});
counts.emplace("cherry", 2);

// 2. SAFE LOOKUP (Without modifying the map!):
if (counts.count("apple")) {
    // Key "apple" exists in map
}

auto it = counts.find("orange");
if (it != counts.end()) {
    int val = it->second; // Key found, access value via it->second
} else {
    // Key "orange" NOT found
}

// 3. Erase key:
counts.erase("apple");
```

> ⚠️ **THE `map[key]` SIDE-EFFECT TRAP:**  
> Accessing `counts["pear"]` when `"pear"` does NOT exist will **automatically insert** `"pear"` with a default value of `0`! Use `counts.count(key)` or `counts.find(key)` to inspect keys safely.

### Iteration (C++17 Structured Bindings)

```cpp
for (const auto& [key, value] : counts) {
    // key is string, value is int
    cout << key << ": " << value << "\n";
}
```

---

## 5. Sets & Priority Queues (`<unordered_set>`, `<set>`, `<queue>`)

### `unordered_set` & `set`

```cpp
#include <unordered_set>
#include <set>

unordered_set<int> st;

st.insert(10);
st.insert(20);
st.erase(10);           // Removes 10

if (st.count(20)) {     // Returns 1 if 20 exists, 0 otherwise
    // 20 is present
}

auto it = st.find(20);
if (it != st.end()) {   // Found element via iterator
    // *it is 20
}
```

### Priority Queue (Heaps)

```cpp
#include <queue>

// 1. MAX-HEAP (Default: largest element on top):
priority_queue<int> max_pq;
max_pq.push(10);
max_pq.push(30);
max_pq.push(20);
max_pq.top();           // Returns 30
max_pq.pop();           // Removes 30
max_pq.empty();         // Returns bool

// 2. MIN-HEAP (Smallest element on top):
priority_queue<int, vector<int>, greater<int>> min_pq;
min_pq.push(10);
min_pq.push(30);
min_pq.push(20);
min_pq.top();           // Returns 10
min_pq.pop();           // Removes 10
```

---

## 6. Stack, Queue, Pair & Tuple (`<stack>`, `<queue>`, `<utility>`, `<tuple>`)

### `std::stack` & `std::queue`

```cpp
#include <stack>
#include <queue>

// STACK (LIFO)
stack<int> st;
st.push(5);
st.top();    // Returns reference to top element (5)
st.pop();    // Removes top element
st.empty();  // Returns true if stack has no elements
st.size();   // Returns number of elements

// QUEUE (FIFO)
queue<int> q;
q.push(5);
q.push(10);
q.front();   // Returns reference to front element (5)
q.back();    // Returns reference to back element (10)
q.pop();     // Removes front element
```

> ⚠️ **CRITICAL GOTCHA:** Calling `.top()` or `.pop()` on an empty stack (or `.front()` on an empty queue) causes **Undefined Behavior / Segmentation Fault**! Always check `!st.empty()` first:
> ```cpp
> if (!st.empty() && st.top() == target) { st.pop(); }
> ```

### `std::pair` & `std::tuple`

```cpp
#include <utility>
#include <tuple>

// 1. PAIR
pair<int, string> p = {1, "one"};
p.first;   // 1
p.second;  // "one"

// Structured binding unpack:
auto [id, label] = p; // id = 1, label = "one"

// 2. TUPLE
tuple<int, string, double> t = make_tuple(10, "test", 3.14);
int a = get<0>(t);      // 10
string b = get<1>(t);   // "test"
double c = get<2>(t);   // 3.14

// Structured binding unpack tuple:
auto [x, y, z] = t;
```

---

## 7. `<algorithm>` & `<numeric>` Essential Functions

```cpp
#include <algorithm>
#include <numeric>
#include <vector>

vector<int> v = {4, 1, 8, 3, 2};

// 1. Sorting Syntax
sort(v.begin(), v.end());                // Ascending: [1, 2, 3, 4, 8]
sort(v.begin(), v.end(), greater<int>());// Descending: [8, 4, 3, 2, 1]

// Custom Lambda Comparator (Sort vector of pairs by 2nd element ascending):
vector<pair<int, int>> pts = {{1, 5}, {2, 3}, {3, 9}};
sort(pts.begin(), pts.end(), [](const auto& a, const auto& b) {
    return a.second < b.second; // Strict weak ordering (<)
});

// 2. Reversal & Swapping
reverse(v.begin(), v.end());             // Reverses elements in-place
swap(v[0], v[1]);                        // Swaps values of two variables/elements

// 3. Min / Max & Element Searches
int m1 = min(10, 20);                    // 10
int m2 = max(10, 20);                    // 20
int m3 = min({1, 5, 2, 9, 3});           // 1 (Brace list for multiple values)

auto max_it = max_element(v.begin(), v.end()); // Iterator to max element
int max_val = *max_it;
int max_idx = max_it - v.begin();              // Index of max element

// 4. Sums & Products (<numeric>)
long long sum = accumulate(v.begin(), v.end(), 0LL); // Sum (0LL ensures long long result)

// 5. Binary Search (Requires sorted range!)
bool found = binary_search(v.begin(), v.end(), 3); // Returns bool

// lower_bound: Returns iterator to first element >= target
auto lb = lower_bound(v.begin(), v.end(), 3);
int lb_idx = lb - v.begin(); // Convert iterator to 0-based index

// upper_bound: Returns iterator to first element > target
auto ub = upper_bound(v.begin(), v.end(), 3);
int ub_idx = ub - v.begin();
```

> ⚠️ **Strict Weak Ordering Trap:** Custom comparators passed to `sort()` must return `false` when elements are equal. Using `<=` instead of `<` causes invalid comparator execution and memory corruption!

---

## 8. Pointers, References, Const Qualifiers, & Struct Syntax

### Pointers vs References

```cpp
int x = 10;

// Pointer (Stores memory address, can be re-bound, can be nullptr)
int* ptr = &x;
*ptr = 20; // Dereferences pointer to modify x (x is now 20)

// Reference (Alias to variable, CANNOT be re-bound, CANNOT be nullptr)
int& ref = x;
ref = 30;  // Modifies x directly (x is now 30)
```

### Const Qualifiers Matrix

| Qualifier | Meaning | Modifiable Data? | Modifiable Pointer? |
| :--- | :--- | :--- | :--- |
| `const int* p` | Pointer to constant int | ❌ No (`*p = 5` fails) | ✅ Yes (`p = &y` works) |
| `int* const p` | Constant pointer to int | ✅ Yes (`*p = 5` works) | ❌ No (`p = &y` fails) |
| `const int* const p` | Constant pointer to constant int | ❌ No | ❌ No |

### Struct Declaration & Member Access (`.` vs `->`)

```cpp
struct Point {
    int x;
    int y;
    Point(int a, int b) : x(a), y(b) {} // Constructor initializer list
};

Point p1(10, 20);
p1.x = 15;            // Dot operator (.) for direct objects

Point* ptr = &p1;
ptr->x = 25;          // Arrow operator (->) for pointers
(*ptr).y = 30;        // Parentheses required: (*ptr).y is equivalent to ptr->y
```

---

## 9. Fast I/O, Buffer Flushing, & String Tokenization

### Fast I/O Statements

```cpp
#include <iostream>
using namespace std;

int main() {
    // Add these two lines at the top of main() for fast competitive execution:
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    return 0;
}
```

### Flushing Newline Buffer (`cin >> ws`)

```cpp
int n;
string line;

cin >> n;
cin >> ws; // FLUSHES leftover newline '\n' or whitespace!

getline(cin, line); // Now correctly reads line without getting an empty string!
```

### String Tokenization with `stringstream`

```cpp
#include <sstream>
#include <string>

string sentence = "apple banana cherry";
stringstream ss(sentence);
string word;

while (ss >> word) {
    // Process each word: "apple", then "banana", then "cherry"
}
```

---

## 10. Numeric Limits, Math Functions, & Overflow Prevention (`<climits>`, `<cmath>`)

### Header Includes & Limits Constants

```cpp
#include <climits> // For integer limits
#include <cmath>   // For math functions

int max_int = INT_MAX;       //  2,147,483,647 (2^31 - 1)
int min_int = INT_MIN;       // -2,147,483,648 (-2^31)

long long max_ll = LLONG_MAX; //  9,223,372,036,854,775,807 (2^63 - 1)
long long min_ll = LLONG_MIN; // -9,223,372,036,854,775,808 (-2^63)
```

### Integer Overflow Prevention Guidelines

```cpp
// 1. Mid-point calculation (Prevents (low + high) overflow):
int mid = low + (high - low) / 2;

// 2. Multiplication casting to long long:
int a = 1000000;
int b = 1000000;
long long prod = 1LL * a * b; // Cast 1LL forces long long calculation before assignment
```

### Common Math Functions (`<cmath>`)

```cpp
abs(-5);              // 5 (Absolute value for int)
labs(-5L);            // 5L (For long)
llabs(-5LL);          // 5LL (For long long)

pow(2, 3);            // 8.0 (Returns double!)
sqrt(16.0);           // 4.0 (Returns double!)
ceil(4.2);            // 5.0 (Rounds up)
floor(4.8);           // 4.0 (Rounds down)
round(4.5);           // 5.0 (Rounds to nearest)
```

> ⚠️ **Don't Forget:** `pow()` and `sqrt()` operate on and return floating-point numbers (`double`). For precise integer power calculations, write a custom loop or binary exponentiation to avoid floating-point rounding errors.

---
