/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cse542;
import cse542.welcomepage;
import cse542.quiz;
import javax.swing.SwingUtilities;
import javax.swing.JFrame;

/**
 *
 * @author shivamgupta
 */
public class cse542 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        // TODO code application logic here
       
       SwingUtilities.invokeLater(new Runnable(){
           @Override
           public void run() {
               quiz ob = new quiz();
                welcomepage ob1 =  new welcomepage();
                
                JFrame frame = new JFrame();
                JFrame frame1 = new JFrame();
                frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                frame.getContentPane().add(ob1);
                frame.pack();
                frame.setVisible(true);
                
//                frame1.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
//                frame1.getContentPane().add(ob);
//                frame1.pack();
//                frame1.setVisible(true);
                
               //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.

           
           }
       
       
       });
    }
    
}
