var  vm;
function Pic(data) {
    var self = this;
    self.id = data.id;
    self.farmid = data.farm;
    self.serverid = data.server;
    self.secret = data.secret;
    self.generatedUrl = "https://farm"+self.farmid+".staticflickr.com/"+self.serverid+"/"+self.id+"_"+self.secret+".jpg";
};

function viewModel(data) {
    var self = this;
    self.orders = ko.observableArray([]);
    self.searchstring = ko.observable("winter");
};

$(document).ready(function() {
    vm = new viewModel();
    ko.applyBindings(vm);

    $.ajax({
        dataType: "jsonp",
        url: "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=613027bbd85c6531eb248c30795029fb&tags="+vm.searchstring()+"&safe_search=1&per_page=5&format=json&jsoncallback=?",
        success: function(data) {
            $.each(data.photos.photo, function(idx, obj) {
                vm.orders.push(new Pic(obj));
            });
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert('failed');
            alert(xhr.responseText);
            alert(xhr.status);
            alert(ajaxOptions);
            alert(thrownError);
        }
    });

    $("#searchbtn").click(function(){
        vm.orders([]);
        $.ajax({
        dataType: "jsonp",
        url: "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=613027bbd85c6531eb248c30795029fb&tags="+vm.searchstring()+"&safe_search=1&per_page=5&format=json&jsoncallback=?",
        success: function(data) {
            $.each(data.photos.photo, function(idx, obj) {
                vm.orders.push(new Pic(obj));
            });
        }
    });
});
});
