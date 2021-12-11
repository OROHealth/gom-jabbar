from setuptools import find_packages, setup

setup(
    name='robot_maker',
    version='1.0.0',
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
    install_requires=[
        'flask',
        'marshmallow',
        'apispec',
        'apispec-webframeworks',
        'pytest',
        'coverage',
        'click',
        'flask-sqlalchemy',
        'sqlalchemy',
        'werkzeug',
        'marshmallow-enum',
        'grpcio',
        'grpcio-tools',
        'rich'
    ],
)
