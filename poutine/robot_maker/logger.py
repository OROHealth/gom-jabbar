import logging

from rich.logging import RichHandler
from rich.console import Console

console = Console(width=400, color_system="standard")


def get_logger():
    logging.basicConfig(
        level="NOTSET",
        format="%(message)s",
        datefmt="[%X]",
        handlers=[RichHandler(markup=True, rich_tracebacks=True)]
    )
    return logging.getLogger("rich")
