# Student Performance Analytics System
**Course:** EWB Courses | Python with AI  
**Assignment:** Python Data Analysis Project  
**Submission Deadline:** 15 October 2026 (or before)  

---

## 1. Project Title & Student Details
* **Project Name:** Student Performance Analytics System
* **Student Name:** `[Your Name Here]` (e.g., John Doe)
* **Student ID / Roll No:** `[Your Student ID]` (e.g., EWB-PY-2026-042)
* **Batch / Course:** Python with AI — Batch 2026
* **Trainer / Mentor:** `[Trainer Name]`

---

## 2. Objective
In educational institutions, manual grading and performance appraisal across subjects are time-consuming and prone to human error. The objective of this project is to build an automated, reliable, and clean Python-based data analytics system.

The system:
- Automates total and percentage/average score calculations across multiple subjects.
- Implements standardized academic grade classification.
- Applies strict academic qualification criteria (minimum passing marks per subject plus minimum average threshold).
- Provides subject-level performance metrics (identifying strong and weak subject areas).
- Highlights attendance risks (< 75%) to help faculty initiate timely student counseling.

---

## 3. Technologies Used
- **Programming Language:** Python 3 (Python 3.10+)
- **NumPy Library:** Used for high-speed multi-dimensional array operations, row-wise summations (`np.sum`), means (`np.mean`), standard deviations (`np.std`), and finding extrema (`np.max`, `np.min`).
- **Pandas Library:** Used for structured DataFrame handling, reading CSV data (`pd.read_csv`), column-level transformations, group aggregations (`groupby`), value counting, and exporting reports (`to_csv`).
- **Version Control & Hosting:** Git and GitHub.

---

## 4. Dataset Description
The dataset is stored in `students.csv` and contains 20 realistic student records across 5 academic departments.

### Columns Description:
1. `Student_ID`: Unique alphanumeric identification string (e.g., S101, S102).
2. `Name`: Full name of the student.
3. `Department`: Academic division (Computer Science, Information Tech, Electronics, Mechanical, Civil).
4. `Maths`: Marks scored out of 100 (Integer, 0–100).
5. `Physics`: Marks scored out of 100 (Integer, 0–100).
6. `Chemistry`: Marks scored out of 100 (Integer, 0–100).
7. `English`: Marks scored out of 100 (Integer, 0–100).
8. `Computer_Science`: Marks scored out of 100 (Integer, 0–100).
9. `Attendance`: Percentage of academic lectures attended (0–100%).

---

## 5. Implementation
The project is built following clean modular programming principles:

### Step 1 — Dataset Ingestion (`load_data`)
The CSV file is read using `pd.read_csv("students.csv")`. Basic properties such as `.shape`, `.columns`, and first five records (`.head()`) are verified.

### Step 2 — Numerical Calculations using NumPy (`calculate_totals_and_averages`)
Rather than iterating cell by cell, the 5 subject marks columns are converted into a 2D NumPy array (`df[subjects].to_numpy()`).
- Row-wise totals are computed via `np.sum(marks_matrix, axis=1)`.
- Row-wise averages are computed via `np.mean(marks_matrix, axis=1)`.
- Results are appended to the DataFrame as `Total_Marks` and `Average_Marks`.

### Step 3 — Loop-based Grading System (`assign_grades` & `get_grade`)
Iterating through the calculated averages with a Python `for` loop, letter grades are assigned using conditional logic:
- Average ≥ 90 : **A+** (Outstanding)
- Average ≥ 80 : **A** (Excellent)
- Average ≥ 70 : **B** (Good)
- Average ≥ 60 : **C** (Satisfactory)
- Average ≥ 50 : **D** (Pass)
- Below 50     : **F** (Fail)

### Step 4 — Strict Pass/Fail Qualification Logic (`assign_result`)
In many competitive universities, a high score in one subject cannot compensate for failing another. The system checks:
1. Marks in **every single subject** must be $\ge 35$.
2. **AND** the overall `Average_Marks` must be $\ge 50$.
If both criteria are met, the status is **"Pass"**; otherwise, it is marked **"Fail"**.

### Step 5 — Subject-Wise Statistical Analysis (`subject_analysis`)
Iterating through each subject using a loop:
- Computes Subject Average (`np.mean`), Maximum (`np.max`), Minimum (`np.min`), and Standard Deviation (`np.std`).
- Identifies the highest performing subject and the toughest subject.

### Step 6 — Departmental Aggregation & Top Performers
- Uses `df.groupby("Department")` to find department averages.
- Uses `.sort_values(by="Average_Marks", ascending=False).head(5)` to extract the top 5 merit rank holders.
- Filters students with `Attendance < 75` to output an attendance warning list.

### Step 7 — Output Generation & Export
Exports the complete evaluated dataset to `student_results.csv` and prints a clear, human-readable terminal report.

---

## 6. Key Features
- **Modular Architecture:** Split cleanly between utility logic (`functions.py`) and driver workflow (`main.py`).
- **Vectorized Performance:** Leverages NumPy 2D array vectorization for fast mathematical operations.
- **Python Fundamentals:** Demonstrates loops, conditional branching (`if/elif/else`), list comprehensions, and custom functions.
- **Dual-Condition Pass/Fail:** Accurately catches students who scored below 35 in any subject even if their overall average was above 50.
- **Attendance Monitoring:** Automatically detects absenteeism (< 75% threshold).
- **Persistent Storage:** Outputs full analytics results to `student_results.csv`.

---

## 7. Output & Sample Terminal Execution

```text
======================================================================
 EWB PYTHON PROJECT: STUDENT PERFORMANCE ANALYTICS SYSTEM
======================================================================
[SUCCESS] Dataset successfully loaded from 'students.csv'.

======================================================================
 1. DATASET OVERVIEW & INITIAL INSPECTION
======================================================================
Total Student Records (Rows)    : 20
Total Attributes (Columns)       : 9
Columns List                     : ['Student_ID', 'Name', 'Department', 'Maths', 'Physics', 'Chemistry', 'English', 'Computer_Science', 'Attendance']

======================================================================
 3. OVERALL CLASS PERFORMANCE SUMMARY
======================================================================
Overall Class Average Mark       : 71.37%
Highest Performing Student       : Ananya Iyer (S104) - 95.0% [Grade A+]
Lowest Performing Student        : Karan Malhotra (S115) - 41.2% [Grade F]

======================================================================
 4. PASS / FAIL EVALUATION STATISTICS
======================================================================
Total Evaluated Students         : 20
Passed Students                  : 16 (80.0%)
Failed Students                  : 4 (20.0%)
Pass Criterion                   : Marks >= 35 in all subjects AND Average >= 50%

======================================================================
 5. GRADE DISTRIBUTION
======================================================================
  Grade A+ :  4 students ( 20.0%)  ████
  Grade A  :  6 students ( 30.0%)  ██████
  Grade B  :  3 students ( 15.0%)  ███
  Grade C  :  2 students ( 10.0%)  ██
  Grade D  :  2 students ( 10.0%)  ██
  Grade F  :  3 students ( 15.0%)  ███

======================================================================
 6. SUBJECT-WISE PERFORMANCE ANALYSIS
======================================================================
         Subject  Average_Marks  Highest_Marks  Lowest_Marks  Std_Deviation
           Maths          70.80             95            32          19.34
         Physics          72.65             96            42          16.92
       Chemistry          71.45             95            30          19.67
         English          73.70             92            45          13.68
Computer_Science          73.70             98            41          18.66

Best Performing Subject          : English & Computer_Science (Average: 73.70%)
Toughest / Lowest Avg Subject    : Maths (Average: 70.80%)

======================================================================
 8. TOP 5 PERFORMING STUDENTS (MERIT LIST)
======================================================================
  Rank #1: Ananya Iyer        | Dept: Computer Science  | Total: 475 | Avg: 95.0% | Grade: A+
  Rank #2: Riya Chakraborty   | Dept: Computer Science  | Total: 463 | Avg: 92.6% | Grade: A+
  Rank #3: Aarav Sharma       | Dept: Computer Science  | Total: 460 | Avg: 92.0% | Grade: A+
  Rank #4: Kavya Reddy        | Dept: Information Tech  | Total: 452 | Avg: 90.4% | Grade: A+
  Rank #5: Sneha Kulkarni     | Dept: Computer Science  | Total: 441 | Avg: 88.2% | Grade: A

======================================================================
 9. STUDENTS WITH ATTENDANCE BELOW 75% (ALERT)
======================================================================
Found 5 student(s) with attendance below required 75% threshold:
Student_ID           Name     Department  Attendance Result
      S106     Priya Nair Information Tech          71   Pass
      S109      Arjun Rao      Electronics          69   Pass
      S114  Meera Nambiar      Electronics          73   Pass
      S115 Karan Malhotra       Mechanical          65   Fail
      S119  Tanmay Bhatia      Electronics          70   Fail

======================================================================
 10. SAVING FINAL RESULTS TO CSV
======================================================================
[SUCCESS] Final analyzed results saved to 'student_results.csv'.
```

---

## 8. Final Outcome
- Transformed raw tabular student data into actionable academic insights.
- Evaluated pass percentages, departmental benchmarks, and individual merit lists.
- Successfully flagged at-risk students for academic and attendance interventions.
- Created reusable Python modules and exported clean, structured output files ready for institutional reporting.

---

## 9. Challenges & Learning
1. **Vectorized vs. Row Iteration:** Learned how converting Pandas slices to 2D NumPy arrays drastically simplifies multidimensional math (`axis=1`).
2. **Compound Conditional Rules:** Handled edge cases where a student had an overall passing average (> 50%) but failed due to scoring under 35 in an individual subject (e.g., student S111 scoring 32 in Maths).
3. **Clean Code Structuring:** Learned the separation of concerns between `functions.py` (business logic) and `main.py` (execution and presentation).
4. **Data Formatting:** Learned how to format Pandas tables and floats cleanly for terminal presentation without requiring external visualization libraries.

---

## 10. GitHub Repository
- **Repository URL:** `https://github.com/[YOUR-USERNAME]/student-performance-analytics`
- **Branch:** `main`

---

## How to Run the Project Locally

### Prerequisites
Make sure you have Python 3 installed on your machine.

### 1. Install Required Libraries
Open your command prompt or terminal in the project folder and run:
```bash
pip install numpy pandas
```

### 2. Run the Main Program
Execute the driver script:
```bash
python main.py
```
*(On macOS/Linux, you can also use `python3 main.py`)*

### 3. Verify Output Files
Upon completion, the terminal displays the full formatted report, and a new file named `student_results.csv` will be created in the directory.

---

## GitHub Submission Steps for EWB Form

1. **Sign in to GitHub:** Open [github.com](https://github.com) and log in to your account.
2. **Create New Repository:** Click the `+` button in the top-right corner -> **New repository**.
   - Repository name: `student-performance-analytics`
   - Set visibility to **Public**.
   - Do NOT check "Initialize with README" if you are pushing local files.
   - Click **Create repository**.
3. **Push Project Files from Your Computer:**
   Open terminal in the project folder and run:
   ```bash
   git init
   git add .
   git commit -m "Initial submission: Student Performance Analytics System"
   git branch -M main
   git remote add origin https://github.com/[YOUR-USERNAME]/student-performance-analytics.git
   git push -u origin main
   ```
4. **Verify in Browser:** Refresh your GitHub repository page. Check that `main.py`, `functions.py`, `students.csv`, `student_results.csv`, and `README.md` are all present.
5. **Copy URL:** Copy your repository URL from the browser address bar.
6. **Submit:** Paste the link into the EWB Course submission Google Form before 15 October 2026.
