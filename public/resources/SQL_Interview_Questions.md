# SQL Interview Questions - Complete Guide

## 1. How do you manage database backups and restoration in SQL?

Managing database backups and restoration in SQL involves several key steps:

### Backup SQL Databases

**Full Backup:** A full backup includes everything in the database. It's recommended to perform full backups regularly, such as weekly or daily depending on the database size.

**Differential Backup:** Captures only the data that has changed since the last full backup. Differential backups are usually performed more frequently than full backups, such as several times a day.

**Transaction Log Backup:** Records all transactions since the last backup, enabling point-in-time recovery. These are performed very frequently (like every 15 minutes) to ensure point-in-time recovery.

### Restore SQL Databases

- **Restore Full Backup:** This restores the database from the full backup file.
- **Restore Differential Backup:** Always restore the full backup first before applying the differential backup.
- **Restore Transaction Log Backup:** Restore the full backup followed by differential backups, and then the transaction log backups.

---

## 2. Explain the different types of data replication in SQL

Data replication in SQL involves copying data and storing them at different locations. It is useful in improving the availability of data.

**4 Types of MS SQL Server Replication:**

1. **Transactional Replication:** Allows you to replicate data from a table in our SQL Server instance to remote databases.

2. **Snapshot Replication:** Data is replicated exactly as it appears at any given time. This is widely regarded as the simplest among the four. Best to use when the original database is not regularly updated.

3. **Merge Replication:** Commonly found in server-to-client environments and allows both the publisher and subscriber to make changes to data dynamically.

4. **Peer-to-peer Replication:** A database is replicated to multiple subscribers at once. Best to use when you have database servers in different locations around the world.

---

## 3. How does SQL integrate with other programming languages?

SQL integrates with other programming languages in following ways:

- **Embedded SQL:** Some programming languages allow SQL statements to be embedded directly within the code. For example - C, C++, or Java.

- **Scripting Languages:** Languages like PHP and Ruby often have built-in support for SQL, which makes it easy to execute query and handle the result directly within web applications.

- **ORM (Object-Relational Mapping):** Allows developers to interact with databases using object-oriented programming principles. For example - Django ORM for Python.

- **Database Drivers and Libraries:** Most languages provide libraries and drivers that communicate with databases. For example - Python: Libraries like sqlite3 for PostgreSQL allow us to execute SQL queries directly from Python code.

- **REST APIs and SQL:** Applications can expose RESTful APIs that interact with databases.

---

## 4. What are the different ways to handle errors in SQL?

Error handling in SQL can vary depending on the DBMS we are using.

**Common Methods:**

- **TRY…CATCH Blocks:** Databases like SQL Server support TRY…CATCH constructs to handle exceptions.

- **Error Codes and Messages:** Most SQL systems return error codes and messages that can be captured and logged for debugging purposes. Use functions like ERROR_NUMBER(), ERROR_MESSAGE() in SQL Server.

- **Transaction Control:**
  - BEGIN Transaction: Start a transaction to group multiple SQL statements.
  - COMMIT: If all the statements succeed, commit the transaction.
  - ROLLBACK: If an error occurs, rollback the transaction, ensuring data integrity.

- **Using Built-in Functions:** Some DBMS provide built-in functions to handle errors. For example: Oracle has EXCEPTION blocks in PL/SQL.

---

## 5. How does SQL handle internationalization and localization?

**Internationalization:** The act of adapting your program so that it isn't fixed to a single language or region.

**Localization:** The process of including the necessary resources in your program.

SQL handles i18n and l10n by supporting:

- **Character Sets and Collations:** Databases support different character sets to store text data in various languages. Collations define how string comparison and sorting are performed.

- **Data Types:** Use appropriate data types like NVARCHAR or NCHAR for Unicode support.

- **Locale-Specific Formats:** SQL can handle locale-specific formats for dates, times, numbers, and currencies.

- **Internationalization Functions:** Many databases provide built-in functions for language-specific operations, such as UPPER(), LOWER().

---

## 6. What is the importance of data types in SQL?

Data types are like labels on a file folder. They help the database understand what kind of information is inside.

**Key Points:**
- Data types help keep the data organized
- They ensure the right information is stored in the right place
- They affect how much space is needed to store information
- Some types of data, like numbers, take up less space than others

**Example:** If you have a column for phone numbers and set the data type to "number", the database will only allow you to store numbers in that column.

---

## 7. How do you perform text searching and pattern matching in SQL?

### Pattern Matching

SQL provides the LIKE operator for standard pattern matching with WHERE clause:
- Use `_` to match a single character
- Use `%` to match an arbitrary number of characters

```sql
SELECT entry FROM data WHERE column LIKE 'pattern';
```

### Text Searching

- **Basic Text Search using LIKE and ILIKE:** LIKE is case-sensitive, ILIKE is case-insensitive
- **Using Regular Expressions:** `~` for case-sensitive, `~*` for case-insensitive
- **Full-Text Search:** Enables finding words or phrases in large collections of documents

---

## 8. Explain database normalization with examples

Database normalization is the process of organizing data to reduce redundancy and improve data integrity.

### First Normal Form (1NF)
- All columns contain atomic values
- Each column contains values of a single type
- Each column has a unique name

### Second Normal Form (2NF)
- Table is in 1NF
- All non-key attributes are fully functionally dependent on the primary key

### Third Normal Form (3NF)
- Table is in 2NF
- All attributes are functionally dependent only on the primary key (no transitive dependencies)

### BCNF (Boyce-Codd Normal Form)
- Table must be in 3NF
- In relation X->Y, X must be a superkey

### Fourth Normal Form (4NF)
- Must be in BCNF
- No multi-valued dependency

### Fifth Normal Form (5NF)
- Must be in 4NF
- The relation must not be further non-loss decomposed

---

## 9. How do you use SQL for reporting and data analysis?

- **Basic Data Retrieval:** `SELECT * FROM table_name;`
- **Filtering Data:** Use WHERE clause
- **Aggregating Data:** Use COUNT(), SUM(), AVG(), MAX(), MIN()
- **Window Functions:** RANK(), LEAD(), LAG() for calculations across rows
- **Stored Procedures and UDFs:** Encapsulate complex analysis logic
- **Reporting Tools:** Create charts, graphs, and reports
- **Data Visualization:** Export to Excel, Tableau, or Power BI

---

## 10. What are the best practices for SQL database design?

1. Apply Normalization Rules
2. Avoid Anomalies
3. Use Proper Data Types
4. Define Primary and Foreign Keys
5. Use Indexing for performance
6. Plan for Scalability
7. Regular Backups and test recovery
8. Regular Maintenance

---

## 11. How does SQL manage large databases with millions of records?

- **Indexing:** Creating a map to help find data quickly
- **Partitioning:** Breaking up huge tables into smaller pieces
- **Caching:** Storing frequently accessed data in quick access area
- **Query Optimization:** Rewriting queries for efficiency

---

## 12. Advantages and disadvantages of denormalization

### Advantages
- Increases query performance and speed
- Simplifies query logic and structure
- Suits reporting or OLAP applications

### Disadvantages
- Increases storage space
- Decreases data quality and integrity
- Complicates data maintenance
- Hinders enforcement of data constraints

---

## 13. How can you retrieve historical data?

- **Auditing:** Create special tables to store all changes
- **Snapshot Tables:** Store snapshots at particular points in time
- **Transaction Log Approach:** Use transaction logs to reconstruct data changes

---

## 14. Explain data warehousing in SQL

Data warehousing is creating a repository optimized for querying and analysis.

**Characteristics:**
- Subject-Oriented
- Integrated
- Time-variant
- Non-Volatile

**SQL's Role:**
- Querying and analyzing data
- ETL processes
- Generating reports and dashboards

---

## 15. How to secure a SQL database?

- Run Multiple SQL Server Security Audits
- Have a Strong Password Policy
- Have a Robust Database Backup Strategy
- Use third-party SQL recovery tools

---

## 16. How do you handle time zone differences?

- Store Timestamps in UTC
- Use Time Zone Aware Data Types
- Store User Time Zone Information

---

## 17. Temporary tables vs Table variables

**Temporary Tables:**
- Created with # prefix
- Used for large data or complex queries
- Disappear when session closes

**Table Variables:**
- Created with DECLARE
- Used for smaller amounts of data
- Exist only during current batch

---

## 18. Implications of using wildcards

- **Flexibility:** Allow flexible searching
- **Performance:** Can be slower, especially leading wildcards
- **Ambiguity:** Can lead to unexpected results
- **Complexity:** Multiple wildcards increase complexity

---

## 19. How to ensure data integrity?

- Database Design and Schema
- Normalization
- Primary and Foreign Keys
- Constraints (NOT NULL, UNIQUE, CHECK, DEFAULT)
- Transactions (ACID properties)
- Triggers

---

## 20. Common performance issues and solutions

**Issues:**
- Slow Queries
- Indexing Problems
- Locking and Blocking
- Resource Contention
- Inefficient Database Design

**Solutions:**
- Optimize queries
- Proper indexing
- Transaction management
- Resource allocation
- Schema optimization

---

## 21. How does SQL handle large-scale data migrations?

**Four Stages:**
1. **Extract:** Extract data from source
2. **Standardize:** Match source data to destination formats
3. **Aggregate and Cleanse:** De-duplicate and calculate derived fields
4. **Load:** Transfer to target database

**Techniques:**
- Batch Processing with Bulk Inserts
- Data Staging with temporary tables
- Documentation and Planning
- Thorough testing before production
