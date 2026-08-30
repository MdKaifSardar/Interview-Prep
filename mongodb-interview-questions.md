# MongoDB Interview Master List (100 Questions)
**Track:** Fresher → 0–1 YOE → Junior Full Stack / Startup

## Legend

**Priority** — 🔴 P0 Essential (don't skip) · 🟠 P1 Important · 🟡 P2 Depth (stronger/deeper interviews)

**Type** — [C] Conceptual · [Q] Query/Hands-on · [D] Design/Scenario · [B] Backend/Mongoose · [P] Performance/Production

---

## 1. Fundamentals & Document Model

1. 🔴 P0 [C] What is MongoDB, and how is it different from a relational database such as MySQL or PostgreSQL?
2. 🔴 P0 [C] Explain the relationship between a MongoDB database, collection, document, and field.
3. 🔴 P0 [C] What is BSON, why does MongoDB use it, and how is it different from JSON?
4. 🔴 P0 [C] What is the `_id` field? What is ObjectId, and why is it commonly used?
5. 🔴 P0 [C] What does "schema-less" or "flexible schema" mean in MongoDB? Does MongoDB actually have a schema?
6. 🟠 P1 [C] What are the advantages and disadvantages of MongoDB compared with a relational database?
7. 🟠 P1 [C] What are the important MongoDB data types, and which ones are commonly encountered in application development?

## 2. CRUD & Querying

8. 🔴 P0 [Q] Explain MongoDB CRUD operations and write examples for inserting, reading, updating, and deleting documents.
9. 🔴 P0 [Q] Given a collection of users, write queries using common comparison and logical operators such as `$gt`, `$gte`, `$lt`, `$lte`, `$eq`, `$ne`, `$in`, `$nin`, `$and`, and `$or`.
10. 🔴 P0 [Q] What is the difference between `find()` and `findOne()`? When would you use each?
11. 🔴 P0 [Q] How do projection, sorting, `limit()`, and `skip()` work? Write a query that returns only selected fields from sorted results.
12. 🔴 P0 [Q] How do you update documents in MongoDB? Demonstrate `$set`, `$inc`, `$unset`, and upsert in practical examples.
13. 🔴 P0 [Q] What is the difference between `updateOne()`, `updateMany()`, `deleteOne()`, and `deleteMany()`? Demonstrate them in one practical exercise.
14. 🔴 P0 [Q] Write queries to filter documents using multiple AND/OR conditions, ranges, and membership in a list of values.
15. 🔴 P0 [Q] Given a users collection, write queries to: find users aged between 20 and 30; find users from a particular city; find users whose email belongs to a given list; sort them by age; return only the first 10 results.
16. 🔴 P0 [Q] Write a query to find the highest-paid employees, the top N employees, and the second-highest salary.
17. 🟠 P1 [Q] How do you query for fields that exist, fields that do not exist, and fields containing null values? Explain the important differences.
18. 🟠 P1 [Q] How would you update a nested field inside a document? Demonstrate updating multiple nested fields in one operation.
19. 🟠 P1 [Q] What is the difference between replacing an entire document and updating selected fields within a document?
20. 🟠 P1 [Q] Design a practical CRUD exercise for a User or Product collection and write all major queries required by its REST API.

## 3. Arrays & Nested Documents

21. 🔴 P0 [Q] How do you query a field inside a nested document?
22. 🔴 P0 [Q] How do you query documents where an array contains a particular value?
23. 🔴 P0 [Q] Given a document containing an array of skills, write queries to add a skill, add it only if it does not already exist, and remove a skill using `$push`, `$addToSet`, and `$pull`.
24. 🔴 P0 [Q] Given an array of embedded objects, how would you query for documents where an array element satisfies multiple conditions?
25. 🟠 P1 [Q] Explain `$elemMatch` and positional array updates. Write a practical query that updates a specific object inside an array.
26. 🟠 P1 [D] A user can have thousands of embedded items. What problems can excessively large or unbounded arrays cause, and how would you redesign the model?

## 4. Indexes & Query Performance

27. 🔴 P0 [C] What is a database index, and why does an index make a MongoDB query faster?
28. 🔴 P0 [C] Conceptually, how does a MongoDB index work? What data structure does MongoDB commonly use for indexes?
29. 🔴 P0 [C] What happens when MongoDB executes a query without an appropriate index?
30. 🔴 P0 [C] What is the difference between a single-field index and a compound index?
31. 🔴 P0 [C] What is a unique index, and when would you use one?
32. 🔴 P0 [C] What is a multikey index, and when does MongoDB create/use one?
33. 🔴 P0 [C] Why does the order of fields in a compound index matter?
34. 🔴 P0 [Q] Given several application queries, design the appropriate indexes for them and explain your choices.
35. 🔴 P0 [P] What are COLLSCAN and IXSCAN? How would you determine whether a query is using an index?
36. 🔴 P0 [P] What is `explain()`? How would you use `explain()` to investigate a slow MongoDB query?
37. 🔴 P0 [P] What are the trade-offs of indexes? Why can adding too many indexes hurt an application?
38. 🔴 P0 [P] An API query works quickly with 100,000 documents but becomes slow with 10 million documents. Walk through your investigation.
39. 🟠 P1 [C] Explain the Equality-Sort-Range (ESR) guideline for compound indexes and apply it to a realistic query.
40. 🟠 P1 [C] What are index prefixes, and why do they matter when designing compound indexes?
41. 🟠 P1 [P] What is a covered query? When can an index allow MongoDB to answer a query without reading the full documents?
42. 🟠 P1 [C] What are partial and sparse indexes? When would each be useful, especially with optional or nullable fields?
43. 🟠 P1 [D] You have an endpoint `GET /products?category=x&minPrice=y&sort=rating`. How would you reason about the index needed for this query?
44. 🟠 P1 [P] A query has an index but is still slow. What possible reasons would you investigate?

## 5. Pagination, Filtering & API Query Patterns

45. 🔴 P0 [B/Q] How would you implement filtering, sorting, and pagination in a MongoDB-backed REST API?
46. 🔴 P0 [C] What is offset/page-based pagination using `skip()` and `limit()`? What are its advantages and limitations?
47. 🔴 P0 [C] What is cursor-based/range-based pagination, and why can it be better for large datasets?
48. 🔴 P0 [Q] Implement cursor-based pagination using an indexed field such as `_id` or `createdAt`.
49. 🟠 P1 [D] An endpoint uses `skip(100000).limit(20)` and becomes increasingly slow. Explain why and redesign the pagination strategy.
50. 🟠 P1 [B] How would you safely construct MongoDB filters from query parameters supplied by an API client?

## 6. Data Modeling

51. 🔴 P0 [C] What is data modeling in MongoDB, and why should schema design start from application access patterns?
52. 🔴 P0 [C] What is embedding? What is referencing?
53. 🔴 P0 [D] Embedding vs referencing: what factors determine which approach you should choose?
54. 🔴 P0 [D] How would you model a one-to-one relationship in MongoDB?
55. 🔴 P0 [D] How would you model a one-to-many relationship?
56. 🔴 P0 [D] How would you model a many-to-many relationship?
57. 🔴 P0 [D] Design a MongoDB schema for Users and Orders. Explain which information you would embed and which you would reference.
58. 🔴 P0 [D] Design a MongoDB schema for Products and Reviews. Explain your embedding/reference decisions.
59. 🔴 P0 [D] Design a MongoDB schema for a social-media application containing users, posts, comments, and likes.
60. 🔴 P0 [D] Design a MongoDB schema for an e-commerce application containing users, products, carts, orders, and reviews.
61. 🟠 P1 [C] Why is denormalization commonly used in MongoDB? What are its benefits and costs?
62. 🟠 P1 [D] What problems can excessive embedding or unbounded document growth cause?
63. 🟠 P1 [D] You need to show the latest five reviews when displaying a product. Would you embed all reviews, reference them, or use a hybrid model? Explain your reasoning.
64. 🟠 P1 [D] Given a real application's read/write access patterns, explain how you would derive the document structure and indexes.

## 7. Aggregation

65. 🔴 P0 [C] What is the MongoDB aggregation framework, and how is an aggregation pipeline different from a normal `find()` query?
66. 🔴 P0 [C/Q] Explain the purpose of the major aggregation stages: `$match`, `$project`, `$group`, `$sort`, `$limit`, `$unwind`, and `$lookup`.
67. 🔴 P0 [Q] Calculate the average salary of employees overall and the average salary for each department using aggregation.
68. 🔴 P0 [Q] Count users grouped by city, department, category, or another field using `$group`.
69. 🔴 P0 [Q] Find the top N products, employees, or customers according to a calculated metric using aggregation.
70. 🔴 P0 [Q] Given orders containing an array of products, use `$unwind` and `$group` to calculate total quantity or revenue per product.
71. 🔴 P0 [Q] Use `$lookup` to combine data from two collections and return a meaningful application result.
72. 🔴 P0 [Q] Given a realistic reporting requirement, design an aggregation pipeline using multiple stages and explain the order of those stages.
73. 🟠 P1 [P] How can indexes improve aggregation performance? Where would you typically want filtering to happen in an aggregation pipeline?
74. 🟠 P1 [Q] Given an existing aggregation pipeline, identify unnecessary stages or opportunities to improve its performance.
75. 🟠 P1 [C] When would you prefer aggregation over multiple application-level queries?

## 8. Mongoose Fundamentals

76. 🔴 P0 [B] What is Mongoose, and how is it different from the native MongoDB Node.js driver?
77. 🔴 P0 [B] Explain the relationship between a Mongoose Schema, Model, Document, and MongoDB Collection.
78. 🔴 P0 [B/Q] Define a realistic Mongoose User or Product schema with types, required fields, defaults, validation, and timestamps.
79. 🔴 P0 [B] How do you create, find, update, and delete documents using Mongoose?
80. 🔴 P0 [B] What is the difference between `find()`, `findOne()`, and `findById()` in Mongoose?
81. 🔴 P0 [B] How do references work in Mongoose? What is the `ref` option?
82. 🔴 P0 [B] What is `populate()`? Demonstrate how you would retrieve related documents using `populate()`.
83. 🔴 P0 [B] How would you model Users → Orders or Users → Posts using Mongoose references?
84. 🔴 P0 [B] How does Mongoose validation work? What is validated by Mongoose versus what is enforced by MongoDB itself?
85. 🟠 P1 [B] What are Mongoose middleware/hooks? Give a practical use case for `pre('save')`.
86. 🟠 P1 [B] How would you use a Mongoose pre-save hook to hash a user's password before storing it?
87. 🟠 P1 [B] What is `lean()` in Mongoose? When might using `lean()` improve performance, and what functionality do you lose?
88. 🟠 P1 [B] What are Mongoose virtuals? Give a practical example such as computing `fullName` without storing it in MongoDB.
89. 🟠 P1 [B] What is the `__v` version key in Mongoose? What problem can versioning or optimistic concurrency control help solve?
90. 🟡 P2 [B] What are Mongoose getters, setters, custom schema methods, and schema statics? When might you use them?

## 9. Node.js / Express / MongoDB Backend Integration

91. 🔴 P0 [B] How does a Node.js/Express application communicate with MongoDB? Walk through the flow from HTTP request to database query to HTTP response.
92. 🔴 P0 [B] How should MongoDB connection logic be structured in a Node.js application? Why should you avoid opening a new database connection for every request?
93. 🔴 P0 [B] How would you structure MongoDB/Mongoose models, controllers, services, and routes in a Full Stack backend?
94. 🔴 P0 [B] How would you validate request data before sending it to MongoDB? Why should API validation and database/schema validation both matter?
95. 🔴 P0 [B] How would you handle errors from MongoDB/Mongoose in Express? Explain how you would distinguish `ValidationError`, `CastError`, and duplicate-key error 11000.
96. 🟠 P1 [B] How would you prevent sensitive database fields such as passwords from being returned through an API?
97. 🟠 P1 [D/P] A production API endpoint performs a MongoDB query that takes several seconds. Walk through your complete debugging process from HTTP request to database query plan.

## 10. Security, Transactions, Concurrency & Production

98. 🔴 P0 [B] What is NoSQL injection? Show how accepting arbitrary MongoDB operators from user input can create a vulnerability, and explain how you would prevent it.
99. 🟠 P1 [C/D] What are MongoDB transactions and when would you use one? Give an e-commerce checkout example and explain when a transaction may be unnecessary because of good document modeling.
100. 🟠 P1 [C/D] Explain replication vs sharding and the problem each solves. Then explain what you would investigate before deciding that a growing Full Stack application actually needs sharding.

---

## Revision Modes

- **Easy / basic fresher interview:** all 🔴 P0 questions
- **Normal full-stack interview:** 🔴 P0 + 🟠 P1
- **Strong startup / deep technical round:** 🔴 P0 + 🟠 P1 + 🟡 P2
- **Fundamental revision:** for every [C] question, explain the concept in your own words (don't just memorize)
- **Practical revision:** actually write the queries/code for every [Q] and [B] question
- **Interview revision:** practice answering [C] questions verbally in 30–90 seconds
- **Design revision:** for every [D] question, cover — requirements/access patterns → document structure → embedding vs referencing → indexes → query patterns → performance trade-offs
- **Performance revision:** for [P] questions, be able to trace query → index → query planner → execution → bottleneck → fix

## Core Principle

The goal isn't memorizing 100 answers — it's being able to understand MongoDB fundamentals, write real queries, design documents, use Mongoose, integrate MongoDB into a backend, reason about indexes and performance, debug common problems, and explain your decisions in an interview. That's the target competency for a strong Fresher / 0–1 YOE Full Stack candidate.
