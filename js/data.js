const READINGS = [
  { title: "Los pulpos tienen tres corazones", text: "Dato curioso: los pulpos tienen tres corazones. Dos de ellos envían sangre a las branquias, que les permiten obtener oxígeno del agua. El tercer corazón lleva la sangre al resto del cuerpo.\n\nAdemás, su sangre es azul porque contiene una sustancia llamada hemocianina, que usa cobre para transportar oxígeno. Es una adaptación muy útil para vivir en el mar.", questions: [
    { text:"¿Cuántos corazones tiene un pulpo?", options:["Uno","Tres","Cinco"], answer:1 },
    { text:"¿Qué órganos reciben sangre de dos de sus corazones?", options:["Las branquias","Los ojos","Los tentáculos"], answer:0 },
    { text:"¿Por qué la sangre del pulpo es azul?", options:["Por la hemocianina con cobre","Porque come algas azules","Porque vive de noche"], answer:0 }
  ]},
  { title:"Las abejas se comunican bailando", text:"Dato curioso: cuando una abeja encuentra flores con néctar, puede informar a las demás mediante un baile. Si se mueve formando una figura parecida a un ocho, realiza el llamado baile del meneo.\n\nLa dirección del baile señala dónde está la comida en relación con el sol. La duración del movimiento ayuda a indicar qué tan lejos se encuentra. Así, muchas abejas trabajan juntas para encontrar alimento.", questions:[
    { text:"¿Qué encuentra una abeja antes de comunicarlo?", options:["Flores con néctar","Una cueva","Una tormenta"], answer:0 },
    { text:"¿Cómo se llama el baile mencionado?", options:["Baile del meneo","Baile de la lluvia","Baile de la luna"], answer:0 },
    { text:"¿Qué puede indicar la duración del movimiento?", options:["La distancia hasta la comida","El color de la flor","La edad de la abeja"], answer:0 }
  ]},
  { title:"Los árboles pueden hablar entre sí", text:"Dato curioso: los árboles pueden compartir señales químicas a través de sus raíces y de unos hongos diminutos que viven bajo tierra. Esta red se conoce popularmente como la red del bosque.\n\nPor medio de ella, algunos árboles pueden avisar a otros de peligros, como insectos que comen hojas. Los árboles cercanos entonces pueden producir sustancias para protegerse.", questions:[
    { text:"¿Por dónde comparten señales los árboles?", options:["Por las raíces y hongos bajo tierra","Por mensajes de texto","Por las nubes"], answer:0 },
    { text:"¿Qué pueden avisar algunos árboles?", options:["Peligros como insectos","El resultado de un partido","La hora exacta"], answer:0 },
    { text:"¿Para qué producen sustancias algunos árboles?", options:["Para protegerse","Para cambiar de color","Para crecer más pequeños"], answer:0 }
  ]},
  { title:"La Luna también se mueve", text:"La Luna no produce su propia luz: refleja la luz del Sol. A medida que gira alrededor de la Tierra, vemos partes distintas de su lado iluminado. Por eso parece cambiar de forma durante el mes.\n\nCuando vemos toda su cara iluminada, se llama luna llena. Cuando casi no vemos la parte iluminada, se llama luna nueva.", questions:[
    { text:"¿De dónde viene la luz que vemos en la Luna?", options:["Del Sol","De las estrellas","De la Tierra"], answer:0 },
    { text:"¿Por qué parece cambiar de forma?", options:["Vemos distintas partes iluminadas","Se encoge cada noche","La cubren las nubes"], answer:0 },
    { text:"¿Cómo se llama cuando vemos su cara iluminada completa?", options:["Luna llena","Luna nueva","Eclipse"], answer:0 }
  ]},
  { title:"Los camaleones cambian para comunicarse", text:"Los camaleones pueden cambiar de color gracias a células especiales de su piel. Aunque a veces les sirve para camuflarse, también cambia su color para comunicarse y regular su temperatura.\n\nUn camaleón puede mostrar colores más intensos cuando está nervioso o quiere impresionar a otro animal.", questions:[
    { text:"¿Qué permite cambiar de color al camaleón?", options:["Células especiales de su piel","Sus escamas de metal","Su lengua"], answer:0 },
    { text:"Además de ocultarse, ¿para qué cambia de color?", options:["Para comunicarse","Para volar","Para respirar bajo agua"], answer:0 },
    { text:"¿Cuándo puede mostrar colores más intensos?", options:["Cuando está nervioso","Cuando duerme","Cuando come una hoja"], answer:0 }
  ]},
  { title:"Una nube pesa más de lo que parece", text:"Las nubes se ven ligeras, pero están formadas por muchísimas gotitas de agua o cristales de hielo. Una nube mediana puede contener cientos de toneladas de agua.\n\nNo cae de golpe porque las gotitas son muy pequeñas y el aire que sube ayuda a mantenerlas suspendidas. Cuando se juntan y crecen, puede empezar a llover.", questions:[
    { text:"¿De qué están formadas las nubes?", options:["Gotitas de agua o hielo","Algodón","Humo solamente"], answer:0 },
    { text:"¿Por qué no cae toda el agua de inmediato?", options:["Las gotitas son pequeñas y el aire las sostiene","No tienen peso","El Sol las amarra"], answer:0 },
    { text:"¿Qué puede ocurrir cuando las gotitas crecen?", options:["Puede llover","La nube desaparece siempre","Se vuelve una estrella"], answer:0 }
  ]},
  { title:"El cerebro practica mientras dormimos", text:"Dormir ayuda al cerebro a ordenar parte de la información aprendida durante el día. Por eso, descansar bien puede facilitar recordar lo que estudiaste o practicabas.\n\nDormir no reemplaza estudiar, pero sí es una parte importante del aprendizaje. Una rutina tranquila antes de acostarse puede ayudar a descansar mejor.", questions:[
    { text:"¿Qué hace el cerebro con parte de la información al dormir?", options:["La ordena","La borra siempre","La convierte en comida"], answer:0 },
    { text:"¿Dormir reemplaza estudiar?", options:["No, pero ayuda al aprendizaje","Sí, completamente","Solo los domingos"], answer:0 },
    { text:"¿Qué puede ayudar a descansar mejor?", options:["Una rutina tranquila","Jugar sin parar","Tomar mucho café"], answer:0 }
  ]}
  ,{ title:"Los delfines se llaman entre sí", text:"Los delfines producen sonidos que les ayudan a comunicarse. Una de sus habilidades más interesantes es crear un silbido característico que puede funcionar como una especie de nombre individual. Así pueden reconocerse y llamarse dentro de su grupo.\n\nTambién utilizan sonidos para orientarse y encontrar objetos bajo el agua mediante la ecolocalización.", questions:[
    { text:"¿Para qué producen sonidos los delfines?", options:["Para comunicarse","Para cambiar el agua","Para dormir"], answer:0 },
    { text:"¿Qué puede funcionar como un nombre individual?", options:["Un silbido característico","El color de la cola","Una burbuja"], answer:0 },
    { text:"¿Qué usan para orientarse bajo el agua?", options:["La ecolocalización","Las alas","La luz de las estrellas"], answer:0 }
  ]},
  { title:"Las hormigas trabajan en equipo", text:"Las hormigas viven en colonias y suelen colaborar para conseguir alimento, cuidar a las crías y mantener su refugio. Se comunican mediante sustancias químicas llamadas feromonas.\n\nCuando una hormiga encuentra comida, puede dejar un rastro químico que ayuda a otras a encontrar el camino. De esta manera, el trabajo de muchas hormigas puede ser más eficiente.", questions:[
    { text:"¿Dónde viven muchas hormigas?", options:["En colonias","En nubes","En océanos abiertos"], answer:0 },
    { text:"¿Cómo pueden comunicarse?", options:["Mediante feromonas","Con teléfonos","Con luces eléctricas"], answer:0 },
    { text:"¿Qué puede dejar una hormiga al encontrar comida?", options:["Un rastro químico","Una bandera","Una pluma"], answer:0 }
  ]},
  { title:"Los pingüinos tienen plumas especiales", text:"Aunque los pingüinos no vuelan, tienen plumas que les ayudan a mantenerse calientes y secos. Sus plumas son muy densas y forman una capa que protege el cuerpo del agua fría.\n\nAdemás, poseen una capa de grasa que ayuda a conservar el calor. Estas adaptaciones les permiten vivir y nadar en ambientes muy fríos.", questions:[
    { text:"¿Para qué sirven sus plumas densas?", options:["Para mantenerse calientes y secos","Para volar muy alto","Para cambiar el agua"], answer:0 },
    { text:"¿Qué otra adaptación ayuda a conservar el calor?", options:["Una capa de grasa","Un pico de madera","Alas de papel"], answer:0 },
    { text:"¿Dónde pueden vivir gracias a estas adaptaciones?", options:["En ambientes muy fríos","Solo en desiertos","Solo en bosques tropicales"], answer:0 }
  ]}
]

