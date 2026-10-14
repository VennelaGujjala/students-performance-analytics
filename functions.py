"""
functions.py
Reusable calculation and processing functions for the Student Performance Analytics System.
Technologies: Python, NumPy, Pandas
"""

import numpy as np
import pandas as pd


def load_data(filepath="students.csv"):
    """
    Reads student dataset from a CSV file into a Pandas DataFrame.
    
    Parameters:
        filepath (str): Path to the CSV file.
        
    Returns:
        pd.DataFrame: Loaded student records.
    """
    try:
        df = pd.read_csv(filepath)
        print(f"[SUCCESS] Dataset successfully loaded from '{filepath}'.")
        return df
    except FileNotFoundError:
        print(f"[ERROR] The file '{filepath}' was not found. Please verify the path.")
        raise


def calculate_totals_and_averages(df, subjects):
    """
    Calculates Total Marks and Average Marks for each student using NumPy arrays.
    
    Parameters:
        df (pd.DataFrame): Student records.
        subjects (list): List of subject column names.
        
    Returns:
        pd.DataFrame: DataFrame with 'Total_Marks' and 'Average_Marks' columns added.
    """
    # Extract marks into a 2D NumPy array for high-performance numerical operations
    marks_matrix = df[subjects].to_numpy()
    
    # Use NumPy functions across axis 1 (row-wise across subjects)
    totals = np.sum(marks_matrix, axis=1)
    averages = np.mean(marks_matrix, axis=1)
    
    # Store calculations back into the DataFrame rounded to 2 decimal places
    df["Total_Marks"] = totals
    df["Average_Marks"] = np.round(averages, 2)
    
    return df


def get_grade(average_mark):
    """
    Determines letter grade based on the project grading scale:
      - 90 and above : A+
      - 80 to 89.99  : A
      - 70 to 79.99  : B
      - 60 to 69.99  : C
      - 50 to 59.99  : D
      - Below 50     : F
      
    Parameters:
        average_mark (float): Average mark of the student.
        
    Returns:
        str: Assigned letter grade.
    """
    if average_mark >= 90:
        return "A+"
    elif average_mark >= 80:
        return "A"
    elif average_mark >= 70:
        return "B"
    elif average_mark >= 60:
        return "C"
    elif average_mark >= 50:
        return "D"
    else:
        return "F"


def assign_grades(df):
    """
    Iterates through student average marks using a standard for-loop and assigns grades.
    
    Parameters:
        df (pd.DataFrame): DataFrame containing 'Average_Marks'.
        
    Returns:
        pd.DataFrame: DataFrame with new 'Grade' column.
    """
    grades_list = []
    
    # Demonstration of loop iteration over student averages
    for avg in df["Average_Marks"]:
        grade = get_grade(avg)
        grades_list.append(grade)
        
    df["Grade"] = grades_list
    return df


def assign_result(df, subjects, min_subject_mark=35, min_average=50):
    """
    Evaluates pass/fail status for each student according to the criteria:
      - Marks must be at least 35 in EVERY subject.
      - AND Overall Average mark must be at least 50.
      - Otherwise, the status is 'Fail'.
      
    Parameters:
        df (pd.DataFrame): Student records.
        subjects (list): Subject column names.
        min_subject_mark (int): Minimum passing threshold for each subject (default 35).
        min_average (int): Minimum passing average mark (default 50).
        
    Returns:
        pd.DataFrame: DataFrame with new 'Result' column ('Pass' or 'Fail').
    """
    results_list = []
    
    # Iterate through every student row to verify subject marks and overall average
    for _, row in df.iterrows():
        # Check if every subject score is >= 35
        passed_all_subjects = True
        for sub in subjects:
            if row[sub] < min_subject_mark:
                passed_all_subjects = False
                break  # Stop checking this student as one subject failed
        
        # Check overall average condition
        has_min_average = row["Average_Marks"] >= min_average
        
        if passed_all_subjects and has_min_average:
            results_list.append("Pass")
        else:
            results_list.append("Fail")
            
    df["Result"] = results_list
    return df


def subject_analysis(df, subjects):
    """
    Performs subject-wise statistical analysis using loops and NumPy calculations.
    
    Parameters:
        df (pd.DataFrame): Student records.
        subjects (list): Subject column names.
        
    Returns:
        pd.DataFrame: Summary table containing Average, Highest, and Lowest mark per subject.
    """
    analysis_records = []
    
    # Loop over each subject to calculate performance indicators
    for sub in subjects:
        # Extract marks column as NumPy array
        marks_arr = df[sub].to_numpy()
        
        highest_mark = int(np.max(marks_arr))
        lowest_mark = int(np.min(marks_arr))
        average_mark = round(float(np.mean(marks_arr)), 2)
        std_dev = round(float(np.std(marks_arr)), 2)
        
        analysis_records.append({
            "Subject": sub,
            "Average_Marks": average_mark,
            "Highest_Marks": highest_mark,
            "Lowest_Marks": lowest_mark,
            "Std_Deviation": std_dev
        })
        
    return pd.DataFrame(analysis_records)


def top_performers(df, n=5):
    """
    Identifies top N performing students sorted by Average Marks.
    
    Parameters:
        df (pd.DataFrame): Student records.
        n (int): Number of top students to return (default 5).
        
    Returns:
        pd.DataFrame: Top N student records sorted descending.
    """
    return df.sort_values(by="Average_Marks", ascending=False).head(n)


def department_analysis(df):
    """
    Calculates average performance grouped by department using Pandas groupby.
    
    Parameters:
        df (pd.DataFrame): Student records.
        
    Returns:
        pd.DataFrame: Department-wise average marks and student count.
    """
    dept_df = df.groupby("Department").agg(
        Student_Count=("Student_ID", "count"),
        Department_Average=("Average_Marks", "mean")
    ).reset_index()
    
    dept_df["Department_Average"] = dept_df["Department_Average"].round(2)
    return dept_df.sort_values(by="Department_Average", ascending=False)
