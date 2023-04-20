package model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.simple.JSONObject;
import dbcon.Connect;

public class LoginCheck {

	public int loginCheck(JSONObject values) {
		String option = (String) values.get("option");
		String username = (String) values.get("username");
		String password = (String) values.get("password");

		if (option.matches("Admin")) {
			return adminLogin(username, password);
		} else if (option.matches("staff")) {
			return staffLogin(username, password);
		} else if (option.matches("student")) {
			return studentLogin(username, password);
		}
		return -1;
	}

	int adminLogin(String username, String password) {
		Connection con = Connect.getInstance().con;
		String SELECT_QUERY = "SELECT * FROM admin_login WHERE username =? && a_password =?";

		ResultSet rs;
		try {
			PreparedStatement ps = con.prepareStatement(SELECT_QUERY);
			ps.setString(1, username);
			ps.setString(2, password);
			rs = ps.executeQuery();
			if (rs.next())
				return 1;
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return -1;
	}

	int studentLogin(String username, String password) {
		Connection con = Connect.getInstance().con;
		String SELECT_QUERY = "SELECT * FROM student_login WHERE mail_id=? && st_password=?";
		PreparedStatement ps;
		try {
			ps = con.prepareStatement(SELECT_QUERY);
			ps.setString(1, username);
			ps.setString(2, password);
			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				return 2;
			}

		} catch (SQLException e) {
			e.printStackTrace();
		}
		return -1;
	}

	int staffLogin(String username, String password) {
		Connection con = Connect.getInstance().con;
		String SELECT_QUERY = "SELECT * FROM staff_login WHERE email_id=? && s_password=?";
		String SELECT_QUERY1 = "SELECT * FROM staff_temp WHERE email_id=? && s_password=?";
		PreparedStatement ps;
		try {
			PreparedStatement prepareSt=con.prepareStatement(SELECT_QUERY1);
			prepareSt.setString(1, username);
			prepareSt.setString(2, password);
			ResultSet rs1=prepareSt.executeQuery();
			if(rs1.next())
				return 4;
			ps = con.prepareStatement(SELECT_QUERY);
			ps.setString(1, username);
			ps.setString(2, password);
			ResultSet rs = ps.executeQuery();
			if (rs.next())
				return 3;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return -1;
	}

}
