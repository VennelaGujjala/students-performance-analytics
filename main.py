"""
====================================================================
Student Performance Analytics System
====================================================================
Course: EWB Courses | Python with AI
Technology: Python 3, NumPy, Pandas
Concepts: Variables, Data Types, Loops, Functions, NumPy, Pandas

File: main.py
Description: Main driver script that coordinates data loading, 
             processing, analytics calculations, report generation,
             and exports final results to CSV.
====================================================================
"""

import os
import numpy as np
import pandas as pd
from functions import (
    load_data,
    calculate_totals_and_averages,
    assign_grades,
    assign_result,
    subject_analysis,
    top_performers,
    department_analysis
)


def print_header(title):
    """Utility helper to print structured visual headers."""
    print("\n" + "=" * 70)
    print(f" {title.upper()}")
    print("=" * 70)


def main():
    print_header("EWB Python Project: Student Performance Analytics System")
    
    # -------------------------------------------------------------
    # Step 1: Define Constants & Load Data
    # -------------------------------------------------------------
    csv_file = "students.csv"
    output_file = "student_results.csv"
    subjects = ["Maths", "Physics", "Chemistry", "English", "Computer_Science"]
    
    print(f"Loading dataset from '{csv_file}'...")
    df = load_data(csv_file)
    
    # -------------------------------------------------------------
    # Step 2: Dataset Overview & Inspection
    # -------------------------------------------------------------
    print_header("1. Dataset Overview & Initial Inspection")
    print(f"Total Student Records (Rows)    : {df.shape[0]}")
    print(f"Total Attributes (Columns)       : {df.shape[1]}")
    print(f"Columns List                     : {list(df.columns)}")
    print("\nFirst 5 Records (df.head()):")
    print(df.head().to_string(index=False))
    
    # -------------------------------------------------------------
    # Step 3: Process Data (Calculations, Grades, Pass/Fail)
    # -------------------------------------------------------------
    # Calculate Totals and Averages using NumPy
    df = calculate_totals_and_averages(df, subjects)
    
    # Assign Letter Grades using Loops
    df = assign_grades(df)
    
    # Assign Pass/Fail based on project criteria
    # Rule: >= 35 in every subject AND average >= 50
    df = assign_result(df, subjects, min_subject_mark=35, min_average=50)
    
    # -------------------------------------------------------------
    # Step 4: Full Processed Student Report
    # -------------------------------------------------------------
    print_header("2. Complete Processed Student Report")
    display_cols = ["Student_ID", "Name", "Department", "Total_Marks", "Average_Marks", "Grade", "Result", "Attendance"]
    print(df[display_cols].to_string(index=False))
    
    # -------------------------------------------------------------
    # Step 5: Overall Class Performance Metrics
    # -------------------------------------------------------------
    print_header("3. Overall Class Performance Summary")
    class_average = round(float(np.mean(df["Average_Marks"])), 2)
    max_avg_val = np.max(df["Average_Marks"])
    min_avg_val = np.min(df["Average_Marks"])
    
    # Find top and lowest student details
    highest_student = df.loc[df["Average_Marks"] == max_avg_val].iloc[0]
    lowest_student = df.loc[df["Average_Marks"] == min_avg_val].iloc[0]
    
    print(f"Overall Class Average Mark       : {class_average}%")
    print(f"Highest Performing Student       : {highest_student['Name']} ({highest_student['Student_ID']}) - {highest_student['Average_Marks']}% [Grade {highest_student['Grade']}]")
    print(f"Lowest Performing Student        : {lowest_student['Name']} ({lowest_student['Student_ID']}) - {lowest_student['Average_Marks']}% [Grade {lowest_student['Grade']}]")
    
    # -------------------------------------------------------------
    # Step 6: Pass / Fail Statistics
    # -------------------------------------------------------------
    print_header("4. Pass / Fail Evaluation Statistics")
    total_students = len(df)
    pass_count = int(np.sum(df["Result"] == "Pass"))
    fail_count = int(np.sum(df["Result"] == "Fail"))
    pass_percentage = round((pass_count / total_students) * 100, 2)
    fail_percentage = round((fail_count / total_students) * 100, 2)
    
    print(f"Total Evaluated Students         : {total_students}")
    print(f"Passed Students                  : {pass_count} ({pass_percentage}%)")
    print(f"Failed Students                  : {fail_count} ({fail_percentage}%)")
    print("Pass Criterion                   : Marks >= 35 in all subjects AND Average >= 50%")
    
    # -------------------------------------------------------------
    # Step 7: Grade Distribution
    # -------------------------------------------------------------
    print_header("5. Grade Distribution")
    grade_order = ["A+", "A", "B", "C", "D", "F"]
    grade_counts = df["Grade"].value_counts()
    
    for grade in grade_order:
        count = grade_counts.get(grade, 0)
        pct = round((count / total_students) * 100, 1)
        bar = "█" * count
        print(f"  Grade {grade:2s} : {count:2d} students ({pct:5.1f}%)  {bar}")
        
    # -------------------------------------------------------------
    # Step 8: Subject-Wise Performance Analysis
    # -------------------------------------------------------------
    print_header("6. Subject-Wise Performance Analysis")
    sub_df = subject_analysis(df, subjects)
    print(sub_df.to_string(index=False))
    
    best_subject_row = sub_df.loc[sub_df["Average_Marks"].idxmax()]
    toughest_subject_row = sub_df.loc[sub_df["Average_Marks"].idxmin()]
    print(f"\nBest Performing Subject          : {best_subject_row['Subject']} (Average: {best_subject_row['Average_Marks']}%)")
    print(f"Toughest / Lowest Avg Subject    : {toughest_subject_row['Subject']} (Average: {toughest_subject_row['Average_Marks']}%)")
    
    # -------------------------------------------------------------
    # Step 9: Department-Wise Performance Analysis
    # -------------------------------------------------------------
    print_header("7. Department-Wise Performance Analysis")
    dept_df = department_analysis(df)
    print(dept_df.to_string(index=False))
    
    # -------------------------------------------------------------
    # Step 10: Top 5 Performers
    # -------------------------------------------------------------
    print_header("8. Top 5 Performing Students (Merit List)")
    top_5_df = top_performers(df, n=5)
    rank = 1
    for _, row in top_5_df.iterrows():
        print(f"  Rank #{rank}: {row['Name']:<18} | Dept: {row['Department']:<17} | Total: {row['Total_Marks']} | Avg: {row['Average_Marks']}% | Grade: {row['Grade']}")
        rank += 1
        
    # -------------------------------------------------------------
    # Step 11: Low Attendance Alert (< 75%)
    # -------------------------------------------------------------
    print_header("9. Students With Attendance Below 75% (Alert)")
    low_att_df = df[df["Attendance"] < 75][["Student_ID", "Name", "Department", "Attendance", "Result"]]
    if len(low_att_df) > 0:
        print(f"Found {len(low_att_df)} student(s) with attendance below required 75% threshold:")
        print(low_att_df.to_string(index=False))
    else:
        print("All students meet the 75% attendance threshold.")
        
    # -------------------------------------------------------------
    # Step 12: Export Processed Results to CSV
    # -------------------------------------------------------------
    print_header("10. Saving Final Results to CSV")
    df.to_csv(output_file, index=False)
    print(f"[SUCCESS] Final analyzed results saved to '{output_file}'.")
    print(f"[VERIFY] Output contains {len(df)} rows and {len(df.columns)} columns.\n")
    print("=" * 70)
    print(" Analysis Completed Successfully!")
    print("=" * 70)


if __name__ == "__main__":
    main()
