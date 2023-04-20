package dbcon;


import java.sql.*;

public class Connect {
	
	private Connect() {}
	public static Connect object=null;
	public Connection con = null;
	
	public static Connect getInstance() {
		if(object==null)
		{
			object=new Connect();
			object.getConnection();
		}
		return object;
	}
	
	void getConnection() {
		String url = "jdbc:mysql://localhost:3306/course_management";
		String username = "root";
		String password = "asus";
		
		try {
			con = DriverManager.getConnection(url, username, password);
			if(con!=null)
				System.out.println("works");
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
//	public static void main(String[] args) {
//		Connect.getInstance();
//	}
}
