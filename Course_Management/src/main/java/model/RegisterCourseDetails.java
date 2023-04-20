package model;

import java.sql.Connection;
import java.sql.PreparedStatement;

import dbcon.Connect;

public class RegisterCourseDetails {
	
	public int registerCourse(int courseId,String studentId) {
		Connection con=Connect.getInstance().con;
		String query="INSERT INTO course_registration VALUES(?,?,curdate()); ";
		try {
			PreparedStatement ps=con.prepareStatement(query);
			ps.setString(1,studentId);
			ps.setInt(2, courseId);
			ps.executeUpdate();
			return 1;
		}catch(Exception e)
		{
			e.printStackTrace();
		}
		return 0;
	}

}
