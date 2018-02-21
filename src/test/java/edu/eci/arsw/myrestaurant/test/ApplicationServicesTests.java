package edu.eci.arsw.myrestaurant.test;

import edu.eci.arsw.myrestaurant.beans.BillCalculator;
import edu.eci.arsw.myrestaurant.model.Order;
import edu.eci.arsw.myrestaurant.services.OrderServicesException;
import edu.eci.arsw.myrestaurant.services.RestaurantOrderServicesStub;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.junit.Assert;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest()
public class ApplicationServicesTests {
     
    /**
     * Clases de equivalencia:
     *  
     *      EC1: Que el numero de la tabla no exista.
     *           Resultado: OrderServicesException.
     *          
     *      EC2: Que el numero de la tabla exista
     *           Resultado: Total de la cuenta.
     **/
    
    @Autowired
    RestaurantOrderServicesStub ros;

    
    @Test
    public void testNoDeberiaCalcularElTotalDeUnaMesaInexistente() throws OrderServicesException{                        
        try{
            int total = ros.calculateTableBill(2);
            //fail("La prueba ha fallado");
        }catch(OrderServicesException e){
            assertEquals("Mesa inexistente o ya liberada:" + 2, e.getMessage());
        }
    }
    
    @Test
    public void testDeberiaCalcularELTotalDeUnaMesaExistente() throws OrderServicesException{
               
        assertEquals(ros.calculateTableBill(3), 32290);
    
    }

}
