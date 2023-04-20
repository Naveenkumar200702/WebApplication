package model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import dbcon.Connect;

public class QuizScoreStore {

	public float addScore(String courseid, String marks, String userName, String totalmarks) {
		Connection con=Connect.getInstance().con;
		int totMarks=Integer.parseInt(totalmarks);
		int stuMarks=Integer.parseInt(marks);
		String query="INSERT INTO result VALUES(?,?,curdate(),?,?)";
		try {
			PreparedStatement ps =con.prepareStatement(query);
			ps.setInt(1, Integer.parseInt(courseid));
			ps.setString(2, userName);
			ps.setInt(3,stuMarks);
			ps.setInt(4,totMarks);
			ps.executeUpdate();
			System.out.print("Result");
			System.out.println((stuMarks*100)/totMarks);
			return (stuMarks*100)/totMarks;
		}catch(Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

}
