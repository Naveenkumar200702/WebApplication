package model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;



import dbcon.Connect;



public class CheckUser {
	public int checkUser(String username, String user) {
		username = username.trim();
		String query = "";
		String query1="SELECT * FROM staff_temp WHERE email_id = ?;";
		if (user.equals("student")) {
			query = "SELECT * FROM student_login WHERE mail_id = ?;";
		} else {
			query = "SELECT email_id FROM staff_login WHERE email_id = ?;";	
		}
		try {
			Connection con = Connect.getInstance().con;
			if(user.equals("staff")||!user.equals("student"))
			{
				PreparedStatement ps = con.prepareStatement(query1);
				ps.setString(1, username);
				ResultSet set = ps.executeQuery();
				if(set.next())
				{
					System.out.println("alread present");
					return -2;
				}
			}
			PreparedStatement st = con.prepareStatement(query);
			st.setString(1, username);
			ResultSet rs = st.executeQuery();
			
			if (rs.next()) {
				return -1;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 1;
	}
}


