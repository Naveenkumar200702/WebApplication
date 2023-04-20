package model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import dbcon.Connect;

public class IsCourseRegistered {

	public int isRegistered(int courseId, String studentId) {
		Connection con=Connect.getInstance().con;
		String query="SELECT * FROM course_registration where courseid=? AND studentid=?";
		try {
			PreparedStatement statement=con.prepareStatement(query);
			statement.setInt(1, courseId);
			statement.setString(2, studentId);
			ResultSet resultSet=statement.executeQuery();
			if(resultSet.next())
				return 1;	
		}catch(Exception e)
		{
			e.printStackTrace();
		}
		return -1;
		
	}

}
