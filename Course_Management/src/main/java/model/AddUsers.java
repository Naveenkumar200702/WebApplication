package model;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import dbcon.Connect;
import dto.NewStaff;
import dto.NewStudent;

public class AddUsers {

	public int addStudent(NewStudent newStudent) {
		Connection con = Connect.getInstance().con;
		String query = "INSERT INTO student_login values(?, ?, ?, ?, ?, ?);";
		Date dob = null;
		try {
			dob = Date.valueOf(newStudent.getDob());
			;
		} catch (Exception e1) {
			e1.printStackTrace();
		}
		try {
			PreparedStatement ps = con.prepareStatement(query);
			ps.setString(1, newStudent.getName());
			ps.setString(2, newStudent.getPassword());
			ps.setDate(3, dob);
			ps.setString(4, newStudent.getMail());
			ps.setString(5, newStudent.getPhoneno());
			ps.setString(6, newStudent.getQualify());
			ps.executeUpdate();
			System.out.println("updated");
			return 1;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return 0;
	}

	public int addStaff(NewStaff obj) {
		Connection con = Connect.getInstance().con;
		String query = "INSERT INTO staff_temp values(?, ?, ?, ?, ?, ?, ?);";
		Date dob = null;
		try {
			dob = Date.valueOf(obj.getDob());
			;
		} catch (Exception e1) {
			e1.printStackTrace();
		}
		try {
			PreparedStatement ps = con.prepareStatement(query);
			ps.setString(1, obj.getName());
			ps.setString(2, obj.getPassword());
			ps.setString(3, obj.getQualification());
			ps.setString(4, obj.getPhoneNo());
			ps.setString(5, obj.getMail());
			ps.setString(6, obj.getExperience());
			ps.setDate(7, dob);
			ps.executeUpdate();
			System.out.println("updated");
			return 1;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return 0;
	}

}
