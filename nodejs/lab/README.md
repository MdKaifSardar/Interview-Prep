# Node.js Technical Interview Hands-On Lab

An ultra-lean, zero-bloat, 100% local coding workspace for Node.js & Express interview practice.

---

## Quick Start

```bash
# 1. Navigate to lab
cd "e:\CSE\interview prep\nodejs\lab"

# 2. View all available drills
node runner.js list

# 3. Practice a specific drill (e.g. Drill 01 or 13)
node runner.js 01
node runner.js 13

# 4. Or validate all drills simultaneously
node runner.js all
```

---

## How It Works

1. **Pick a Drill:** Choose from `exercises/` below.
2. **Open `starter.js`:** Write your implementation in the template following the requirements in `README.md`.
3. **Run the Test:** Run `node runner.js <drill_number>` to validate your solution.
4. **Compare with Solution:** Reference `solution.js` or the [master answer key](../nodejs-interview-answers.md).

---

## Drill Catalog (24 High-Yield Coding Drills)

| # | Folder | Target Questions | Skills Tested |
| :-: | :--- | :--- | :--- |
| **01** | [`01_event_loop_order`](./exercises/01_event_loop_order/) | Q8, Q58 | Event Loop & Microtask Priority (`nextTick`, `Promise`, timers) |
| **02** | [`02_event_loop_starvation`](./exercises/02_event_loop_starvation/) | Q10, Q63 | Event loop starvation & chunking with `setImmediate` |
| **03** | [`03_custom_event_emitter`](./exercises/03_custom_event_emitter/) | Q17 | Custom `EventEmitter` (`on`, `emit`, `once`, `off`) |
| **04** | [`04_stream_pipeline`](./exercises/04_stream_pipeline/) | Q21 | Safe transform streaming using `stream.pipeline` |
| **05** | [`05_graceful_shutdown`](./exercises/05_graceful_shutdown/) | Q24 | Server connection draining on `SIGINT`/`SIGTERM` |
| **06** | [`06_promisify_from_scratch`](./exercises/06_promisify_from_scratch/) | Q25, Q71 | Converting error-first callbacks to native Promises |
| **07** | [`07_route_and_params`](./exercises/07_route_and_params/) | Q29, Q30 | Express route params (`:id`), query strings, and 400/404 handling |
| **08** | [`08_fix_headers_sent`](./exercises/08_fix_headers_sent/) | Q31, Q60 | Debugging dual `res.json()` and `ERR_HTTP_HEADERS_SENT` |
| **09** | [`09_middleware_chain`](./exercises/09_middleware_chain/) | Q33, Q34 | Request ID injection (`req.id`) & response duration tracking |
| **10** | [`10_centralized_error_handler`](./exercises/10_centralized_error_handler/) | Q35, Q67 | 4-argument Express error middleware handling operational errors |
| **11** | [`11_input_validation_zod`](./exercises/11_input_validation_zod/) | Q44 | Schema-based payload validation with Zod returning 422 |
| **12** | [`12_password_hashing`](./exercises/12_password_hashing/) | Q45 | Secure password hashing & salting with `bcryptjs` |
| **13** | [`13_jwt_auth_guard`](./exercises/13_jwt_auth_guard/) | Q46, Q66 | JWT Bearer token authentication middleware & 401/403 status |
| **14** | [`14_rbac_middleware`](./exercises/14_rbac_middleware/) | Q48 | Role-based authorization middleware guard (`requireRoles`) |
| **15** | [`15_cors_handler`](./exercises/15_cors_handler/) | Q49 | Custom zero-dependency CORS header & preflight `OPTIONS` handler |
| **16** | [`16_supertest_api`](./exercises/16_supertest_api/) | Q57 | Headless Express integration testing using `supertest` |
| **17** | [`17_fix_hanging_middleware`](./exercises/17_fix_hanging_middleware/) | Q62 | Debugging middleware that forgot `next()` or failed on error |
| **18** | [`18_crud_rest_api`](./exercises/18_crud_rest_api/) | Q64 | Full in-memory CRUD REST API (GET, POST, PUT, DELETE) |
| **19** | [`19_request_logger`](./exercises/19_request_logger/) | Q65 | Method, URL, status code, and latency logger (`res.on('finish')`) |
| **20** | [`20_app_error_hierarchy`](./exercises/20_app_error_hierarchy/) | Q67 | Extensible `AppError` class hierarchy with HTTP status codes |
| **21** | [`21_in_memory_rate_limiter`](./exercises/21_in_memory_rate_limiter/) | Q68 | Sliding/fixed window IP request throttling returning 429 |
| **22** | [`22_async_handler_wrapper`](./exercises/22_async_handler_wrapper/) | Q69 | Express 4 `asyncHandler` wrapper catching promise rejections |
| **23** | [`23_csv_line_stream`](./exercises/23_csv_line_stream/) | Q70 | Memory-safe line-by-line CSV stream parser across chunk boundaries |
| **24** | [`24_in_memory_ttl_cache`](./exercises/24_in_memory_ttl_cache/) | Q72 | In-memory key-value cache with automatic TTL expiration |
