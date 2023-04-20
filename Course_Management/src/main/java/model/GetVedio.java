package model;

import java.sql.Connection;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.time.LocalDate;
import java.util.Date;

import dbcon.Connect;

public class GetVedio {
	public String getVedio(int courseId,int week, String userName) {
		Connection con=Connect.getInstance().con;
		String query="SELECT vedio_tutorial FROM modules WHERE courseId=? AND weeks=?";
		String getRegisterDate="SELECT dateofregister from course_registration WHERE studentid=? && courseid=?";
		try {
			PreparedStatement prepStat=con.prepareStatement(getRegisterDate);
			prepStat.setString(1, userName);
			prepStat.setInt(2, courseId);
			ResultSet dateOfRegister=prepStat.executeQuery();
			if(dateOfRegister.next())
			{
				Date registerDate=dateOfRegister.getDate("dateofregister");
				LocalDate now=LocalDate.now();
				
				Long difference=registerDate.getTime();
				
				
				
				PreparedStatement ps=con.prepareStatement(query);
				ps.setInt(1,courseId );
				ps.setInt(2, week);
				ResultSet rs=ps.executeQuery();
				if(rs.next())
				{
					return rs.getString("vedio_tutorial");
				}
				
			}
			
			
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		return "";
	}
	
}
