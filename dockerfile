#   _____  _______          _______  __   __
#  / ____|/ ____\ \        / /  __ \ \ \ / /
# | |  __| (___  \ \  /\  / /| |__) | \ V / 
# | | |_ |\___ \  \ \/  \/ / |  _  /   > <  
# | |__| |____) |  \  /\  /  | | \ \  / . \ 
#  \_____|_____/    \/  \/   |_|  \_\/_/ \_\
#                                           
# Dockerfile for Angular Material Frontend Boilerplate
FROM nginx
LABEL maintainer='christian@degasfabriek.com'
COPY ./dist/angular-material-frontend-boilerplate/ /usr/share/nginx/html