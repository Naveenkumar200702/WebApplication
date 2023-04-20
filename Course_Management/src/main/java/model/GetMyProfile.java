package model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

import org.json.JSONObject;

import dbcon.Connect;

public class GetMyProfile {

	public JSONObject getMyProfile(String userName, String userOption) {
		Connection con = Connect.getInstance().con;
		String SELECT_QUERY = "";
		JSONObject myProfile = new JSONObject();
		if (userOption.equals("student")) {
			SELECT_QUERY = "SELECT * FROM student_login WHERE mail_id=?";
		} else {
			SELECT_QUERY = "SELECT * FROM staff_login WHERE email_id=?";
		}
		try {
			PreparedStatement ps = con.prepareStatement(SELECT_QUERY);
			ps.setString(1, userName);
			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				if (userOption.equals("student")) {
					myProfile.put("option", userOption);
					myProfile.put("mail",userName);
					myProfile.put("name", rs.getString("student_name"));
					myProfile.put("dob",rs.getDate("dob"));
					myProfile.put("phoneNo",rs.getString("phone_no"));
					myProfile.put("qualification", rs.getString("highest_qualification"));
				} else {
					myProfile.put("option", userOption);
					myProfile.put("mail",userName);
					myProfile.put("name", rs.getString("staff_name"));
					myProfile.put("dob",rs.getDate("dob"));
					myProfile.put("phoneNo",rs.getString("phone_no"));
					myProfile.put("qualification", rs.getString("highest_qualification"));
					myProfile.put("experience",rs.getString("experience"));
					
				}

			}

		} catch (Exception e) {

		}

		return myProfile;

	}
}
