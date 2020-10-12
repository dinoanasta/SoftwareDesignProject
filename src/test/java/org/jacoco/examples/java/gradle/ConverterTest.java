import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import java.util.ArrayList;
import java.io.InputStream;
import java.io.PrintStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.Scanner;
import java.io.File;
import java.io.FileNotFoundException;



public class ConverterTest {
  private final InputStream systemIn = System.in;
  private final PrintStream systemOut = System.out;

  private ByteArrayInputStream testIn;
  private ByteArrayOutputStream testOut;

  @Before
  public void setUpOutput() {
    testOut = new ByteArrayOutputStream();
    System.setOut(new PrintStream(testOut));
  }

  private void provideInput(String data) {
    testIn = new ByteArrayInputStream(data.getBytes());
    System.setIn(testIn);
  }

  private String getOutput() {
    return testOut.toString();
  }

  @After
  public void restoreSystemInputOutput() {
    System.setIn(systemIn);
    System.setOut(systemOut);
  }

  @Test
  public void testCase1() throws FileNotFoundException{ //test Converter on graph colouring case
    String filename = "Graph_graphcolouring_test_colouring.txt";
    Scanner sc = new Scanner(new File(filename));
    // file has one line in JSON format
    String line = sc.nextLine();
    sc.close();
    final String testString = "Graph [vertices=[0;A;0 1;B;0 2;C;0 3;D;0 4;E;0],\n"+
            "adjacency_matrix=[\n"+
            "01100\n"+
            "10000\n"+
            "10011\n"+
            "00100\n"+
            "00100\n"+
            "],\n"+
            "edges=[0-1: 1, 0-2: 1, 1-0: 1, 2-0: 1, 2-3: 1, 2-4: 1, 3-2: 1, 4-2: 1]]";
    provideInput(testString);
    Converter con = new Converter();
    Assert.assertEquals(testString, getOutput());
  }
}
