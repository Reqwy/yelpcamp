var mongoose = require('mongoose');

var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Clouds  Rest",
        image: "https://images.unsplash.com/photo-1497900304864-273dfb3aae33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1388&q=80",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas libero nulla, porttitor ut lectus a, sagittis consectetur neque. Ut at massa interdum, pretium nibh ut, dignissim ante. Aenean vulputate congue lorem in fringilla. Vivamus molestie pretium dui sed fringilla. Sed semper, nulla commodo vehicula condimentum, eros arcu consectetur lorem, eu rhoncus mi erat ut odio. Cras non sagittis ipsum, vel venenatis urna. Cras posuere ultrices quam, in imperdiet purus tempor eget. Sed nec ante aliquam, tincidunt augue at, sollicitudin erat. Cras sit amet fermentum ligula. Pellentesque ac ultricies dui. Nullam malesuada quis justo eget pulvinar. Nulla tincidunt urna non neque varius, sit amet eleifend nunc hendrerit. Suspendisse potenti. Quisque sollicitudin pellentesque ex, sed faucibus metus accumsan nec. Suspendisse at luctus erat. Phasellus vitae magna rutrum, vestibulum mauris in, lacinia lacus.\n" +
        "Integer mauris sem, ultrices sed leo eu, malesuada lacinia erat. Vestibulum fermentum auctor erat vel eleifend. Nulla facilisi. Nunc fermentum, augue nec venenatis congue, magna dolor sodales ligula, eget auctor leo eros vitae est. Duis ultricies, odio in mattis porta, dolor est egestas ex, id euismod magna massa vel nibh. Morbi urna augue, fermentum vel porttitor et, mattis a elit. Nullam tempus, erat at convallis efficitur, ante neque molestie felis, vel posuere leo turpis sit amet dui. Nulla vel dolor ut felis pulvinar iaculis. Nunc convallis suscipit tellus quis dictum. Phasellus purus nibh, porta quis magna eu, scelerisque pharetra ex. Phasellus in ipsum et lorem laoreet egestas. Cras non felis sed ante consequat tempus eu et nulla. Donec molestie neque non blandit pulvinar. Sed sit amet velit lacus. Etiam tristique hendrerit libero sed consequat. Quisque porttitor metus felis, at semper justo eleifend a."
    },
    {
        name: "Desert Mesa",
        image: "https://images.unsplash.com/photo-1546890975-7596e98cdbf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas libero nulla, porttitor ut lectus a, sagittis consectetur neque. Ut at massa interdum, pretium nibh ut, dignissim ante. Aenean vulputate congue lorem in fringilla. Vivamus molestie pretium dui sed fringilla. Sed semper, nulla commodo vehicula condimentum, eros arcu consectetur lorem, eu rhoncus mi erat ut odio. Cras non sagittis ipsum, vel venenatis urna. Cras posuere ultrices quam, in imperdiet purus tempor eget. Sed nec ante aliquam, tincidunt augue at, sollicitudin erat. Cras sit amet fermentum ligula. Pellentesque ac ultricies dui. Nullam malesuada quis justo eget pulvinar. Nulla tincidunt urna non neque varius, sit amet eleifend nunc hendrerit. Suspendisse potenti. Quisque sollicitudin pellentesque ex, sed faucibus metus accumsan nec. Suspendisse at luctus erat. Phasellus vitae magna rutrum, vestibulum mauris in, lacinia lacus.\n" +
        "Integer mauris sem, ultrices sed leo eu, malesuada lacinia erat. Vestibulum fermentum auctor erat vel eleifend. Nulla facilisi. Nunc fermentum, augue nec venenatis congue, magna dolor sodales ligula, eget auctor leo eros vitae est. Duis ultricies, odio in mattis porta, dolor est egestas ex, id euismod magna massa vel nibh. Morbi urna augue, fermentum vel porttitor et, mattis a elit. Nullam tempus, erat at convallis efficitur, ante neque molestie felis, vel posuere leo turpis sit amet dui. Nulla vel dolor ut felis pulvinar iaculis. Nunc convallis suscipit tellus quis dictum. Phasellus purus nibh, porta quis magna eu, scelerisque pharetra ex. Phasellus in ipsum et lorem laoreet egestas. Cras non felis sed ante consequat tempus eu et nulla. Donec molestie neque non blandit pulvinar. Sed sit amet velit lacus. Etiam tristique hendrerit libero sed consequat. Quisque porttitor metus felis, at semper justo eleifend a."
    
    },
    {
        name: "Canyon Floor",
        image: "https://images.unsplash.com/photo-1562602981-626773f48089?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas libero nulla, porttitor ut lectus a, sagittis consectetur neque. Ut at massa interdum, pretium nibh ut, dignissim ante. Aenean vulputate congue lorem in fringilla. Vivamus molestie pretium dui sed fringilla. Sed semper, nulla commodo vehicula condimentum, eros arcu consectetur lorem, eu rhoncus mi erat ut odio. Cras non sagittis ipsum, vel venenatis urna. Cras posuere ultrices quam, in imperdiet purus tempor eget. Sed nec ante aliquam, tincidunt augue at, sollicitudin erat. Cras sit amet fermentum ligula. Pellentesque ac ultricies dui. Nullam malesuada quis justo eget pulvinar. Nulla tincidunt urna non neque varius, sit amet eleifend nunc hendrerit. Suspendisse potenti. Quisque sollicitudin pellentesque ex, sed faucibus metus accumsan nec. Suspendisse at luctus erat. Phasellus vitae magna rutrum, vestibulum mauris in, lacinia lacus.\n" +
        "Integer mauris sem, ultrices sed leo eu, malesuada lacinia erat. Vestibulum fermentum auctor erat vel eleifend. Nulla facilisi. Nunc fermentum, augue nec venenatis congue, magna dolor sodales ligula, eget auctor leo eros vitae est. Duis ultricies, odio in mattis porta, dolor est egestas ex, id euismod magna massa vel nibh. Morbi urna augue, fermentum vel porttitor et, mattis a elit. Nullam tempus, erat at convallis efficitur, ante neque molestie felis, vel posuere leo turpis sit amet dui. Nulla vel dolor ut felis pulvinar iaculis. Nunc convallis suscipit tellus quis dictum. Phasellus purus nibh, porta quis magna eu, scelerisque pharetra ex. Phasellus in ipsum et lorem laoreet egestas. Cras non felis sed ante consequat tempus eu et nulla. Donec molestie neque non blandit pulvinar. Sed sit amet velit lacus. Etiam tristique hendrerit libero sed consequat. Quisque porttitor metus felis, at semper justo eleifend a."
    
    }
]

function seedDB() {

    // REmove all
    Campground.remove({}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("remove campgrounds!");
        }
        createSome();
    });


    // add  a few campgrounds

    //add a few comments
}

function createSome() {
    data.forEach(function (dataPiece) {
        Campground.create(dataPiece, function (err, campground) {
            if (err) {
                console.log(err);
            } else {
                console.log(campground);
                // create a comment
                Comment.create({
                    text: "this place  is great, but I wish there was  internet",
                    author: "Homer"
                }, function (err, comment) {
                    if (err) {
                        console.log(err);
                    } else {
                        campground.comments.push(comment);
                        campground.save();
                        console.log("Created new comment");
                    }
                });
            }
        })
    });
}

module.exports = seedDB;