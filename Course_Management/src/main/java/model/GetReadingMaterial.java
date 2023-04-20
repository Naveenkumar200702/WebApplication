package model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import dbcon.Connect;

public class GetReadingMaterial {
	
	public String getReadingMaterial(int courseid) {
		Connection con=Connect.getInstance().con;
		String result="";
		String query="SELECT reading_material from course_details where course_id=?";
		try {
			PreparedStatement ps=con.prepareStatement(query);
			ps.setInt(1, courseid);
			ResultSet rs=ps.executeQuery();
			if(rs.next())
			{
				result=rs.getString("reading_material");
			}
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return result;	
	}

}
