import click
from flask.cli import with_appcontext
from rich import progress as rich_progress

from robot_maker import ASCIIART, ASCIISTYLE
from robot_maker.logger import console
from robot_maker.models.recipe import Recipe


@click.command('simulate-poutine-making')
@click.option('-n', 'n', default=1, help='Set the number of Poutines to product')
@with_appcontext
def simulate_poutine_command(n):
    """Clear the existing data and create new tables."""
    console.print(ASCIIART, style=ASCIISTYLE)

    try:
        n = int(n)
        total_poutines = 0

        with rich_progress.Progress() as progress:
            task = progress.add_task("Cooking...", total=n)
            for i in range(n):
                progress.console.print(f"[bold]Preparing [bold]#{i+1}[/] poutine(s) out of [bold]#{n}[/][/]\n")
                # time.sleep(1)
                poutine_recipe = Recipe.query.filter_by(name="Poutine").first()
                success, message, log = poutine_recipe.cook()
                if success:
                    total_poutines += 1

                progress.advance(task)

        console.print(f"\n[bold]Successfully produced [bold]#{total_poutines}[/] poutine(s) out of [bold]#{n}[/]")

    except ValueError as e:
        console.log(f"{n} is not a valid int parameter")


def init_app_commands(app):
    app.cli.add_command(simulate_poutine_command)
