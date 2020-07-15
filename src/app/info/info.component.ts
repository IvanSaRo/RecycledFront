import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-info",
  templateUrl: "./info.component.html",
  styleUrls: ["./info.component.css"]
})
export class InfoComponent implements OnInit {
  articles: any[];

  // Ruta actual
  rutaActual: string;

  articuloSeleccionado: any;

  constructor(private router: Router) {
    // Ruta actual
    this.rutaActual = this.router.url;

    // Articulos generales (Cambiar texto y cosas aqui)
    this.articles = [
      {
        Titulo: "Recycling",
        Subtitle: "Reciclaje de productos",
        Texto1:
          "Cuando hablamos de reciclaje hablamos de preservar el medio ambiente, el entorno en el que vivimos. Es importante no pensar solamente en nosotros, sino en el mañana, en el futuro de las generaciones que vendrán. Si descuidamos el planeta y lo destruimos, ¿qué quedará para nuestros hijos? Hay que pensar en el futuro de la especie humana, en dejar un mundo mejor para que ellos puedan cuidarlo, conservarlo y sobre todo amarlo. El reciclaje es una herramienta útil producto de la conciencia responsable, la cual nos proporciona una idea de cómo contribuir y aportar ese granito de arena a la construcción de un mundo mejor, de un mundo donde se respete el medio ambiente y se ayude a preservarlo. Si aún no tienes la costumbre de reciclar, todavía estás a tiempo de empezar. Los que aún no reciclan se preguntan: ¿qué gano yo reciclando? No sólo tú, todo el planeta se beneficia de ello. A continuación vamos a enumerar los principales beneficios del reciclaje",
        Texto2:
          "El reciclaje permite ahorrar energía de forma significativa. Es menos costoso reciclar un material que fabricarlo desde cero, como ocurre por ejemplo con el vidrio. Reciclar ayuda a evitar la explotación de los recursos naturales y hace posible que los materiales originales puedan ser aprovechados con un nuevo uso, sin que sea necesario volver a usar recursos naturales para fabricarlos. También se evitan los métodos de extracción de recursos naturales, que son invasivos y contaminantes. El reciclaje permite no sustraer nueva materia prima para fabricación y se puede simplemente reciclar la materia existente. Se reduce la contaminación, proporcionando una atmósfera más limpia. Ayudamos a reducir el daño producido al medio ambiente. Se conserva el medio ambiente ya que permite reducir la cantidad de desechos sólidos que llegan a los vertederos. Esto hace posible que los vertederos ocupen menos espacio e incluso puedan llegar a cerrarse, evitando el impacto negativo que causan sobre el medio ambiente. Permite alargar la vida útil de los vertederos, ya que se llenan a un menor ritmo evitando que se abran más vertederos. Son todo ventajas a cambio de poco esfuerzo",
        Image1: "../../assets/img/info/recycling.jpg",
        Image2: "../../assets/img/info/recycling1.jpg"
      },
      {
        Titulo: "Upcycling",
        Subtitle: "Upciclaje de productos",
        Texto1:
          "Cuando hablamos de reciclaje nos referimos a un proceso industrial a través del cual un residuo se transforma en un nuevo material y se utiliza para la producción de nuevos objetos. El Upcycling es un término acuñado recientemente, también conocido como supra-reciclaje, o reciclaje creativo. En el Upcycling, se aprovechan objetos para crear productos por medio de la creatividad que tienen un mayor valor que el que tenía el objeto original. O, lo que es lo mismo: se trata de transformar residuos en objetos de valor usando la imaginación. Sí que es cierto que, para hacer upcycling, partimos de un material/objeto que, muchas veces, si no lo hubiéramos utilizado para esto, hubiera acabado en el cubo de reciclaje, pero no tiene por qué ser así. El upcycling, más que en reciclar, consiste en reimaginar usos de productos y materiales existentes y convertirlos en algo nuevo.",
        Texto2:
          "El upcycling, más que de reciclaje, es un recurso creativo para ser sostenible y también para aportar más valor a los objetos y muebles de nuestra casa. Un mueble nuevo contará una historia al cabo de unos años, pero un mueble u objeto que proviene del upclycing ya cuenta una historia en sí mismo. No solo por la propia transformación del objeto, sino por la idea y las técnicas empleadas para que se convierta en lo que hoy es.Upcycling es reelaborar, reinventar, tratar de ver nuevas formas dentro de las ya existentes sin que pierdan ese toque original que las identifica. Esta es otra gran diferencia entre upcycling y recycling: mientras que, cuando algo se recicla, el material u objeto pierde su forma original, la gracia del upcycling es que se pueda identificar claramente qué era ese objeto antes de su nueva función. Es una especie de homenaje, una exaltación y realce de lo que ese objeto fue una vez.",
        Image1: "./../assets/img/info/up.jpg",
        Image2: "./../assets/img/info/luz.jpg"
      }
    ];
  }

  ngOnInit() {
    //console.log(this.rutaActual);

    if (this.rutaActual == "/info/recycling") {
      this.articuloSeleccionado = this.articles[0];
    } else if (this.rutaActual == "/info/upcycling") {
      this.articuloSeleccionado = this.articles[1];
    }
  }
}
