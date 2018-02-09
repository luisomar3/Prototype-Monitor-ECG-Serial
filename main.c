// UNY

#include <16F871.h>
#device ADC=8
#fuses NOWDT, NOPROTECT, NOLVP, HS,  XT
#use delay (clock = 20000000) 
#include <stdio.h>
#use rs232(baud=57600, xmit=PIN_C6, rcv=PIN_C7)
int a,k,contador,t1,t2,T,F;
int16 valor;





void main()
{
   SETUP_ADC_PORTS (AN0) ;
   //Puerto analogico del ADC
   setup_adc (ADC_CLOCK_INTERNAL) ;
   SETUP_TIMER_0(RTCC_INTERNAL | RTCC_DIV_256);
   ENABLE_INTERRUPTS(GLOBAL);
   // Habilitar interrupciones
   delay_ms (5000) ;
   putc (0x55) ; // Comando de AutoBaudRate
   delay_ms (5000) ;
   putc (0x45) ; // Erase
   printf ("%c%c%c", 0x42, 0x11, 0x11) ; // Comando para fondo de pantalla
   delay_us(20);
   WHILE (TRUE)
   {
      set_adc_channel (0) ;
      delay_us (2) ;
      //voltaje = (valor * 5.0) / 255; // conversion de voltaje 
      //delay_ms (2) ;
      //printf ("%f\n", voltaje) ;    
      IF (!input (pin_d1))
      {
         for(a=127; a>=0;a++)
         {
         valor = read_adc ();
         printf("%c%c%c%c%c",0x50,a,valor-30,0x00,0x00); 
        delay_us(2);
 
       }
       
     putc (0x45); //borrar pantalla

        
         }
                IF(!input(pin_d0))

      {
             valor = read_adc ();
              printf("%lu\n",valor);
               delay_us(2);
      }
      }

       }
         

      
          
   


   
   
   


