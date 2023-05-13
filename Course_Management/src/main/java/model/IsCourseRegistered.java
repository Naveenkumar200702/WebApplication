package model;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.concurrent.TimeUnit;

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
			{
				Date registerDate=resultSet.getDate("dateofregister");
				long millis=System.currentTimeMillis();     
			    long time_difference = millis - registerDate.getTime();  
	            int days_difference = (int)TimeUnit.MILLISECONDS.toDays(time_difference) % 365;  
				return days_difference;
				
			}
				
		}catch(Exception e)
		{
			e.printStackTrace();
		}
		return -1;
		
	}

}
