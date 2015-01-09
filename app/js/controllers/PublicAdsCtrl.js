adsApp.controller('PublicAdsCtrl', [
    '$scope',
    'adsData',
    'pageSize',
    'notification',
    function ($scope, adsData, pageSize, notification) {

        $scope.ready = false;
        $scope.adsParams = {
            startPage: 1,
            pageSize: pageSize
        };

        $scope.reloadAds = function () {
            adsData.getPublicAds(
                $scope.adsParams,
                function success(data) {
                    $scope.ads = data;
                    $scope.ready = true;
                },
                function error(err) {
                    notification.showError('Cannot load ads', err);
                }
            );
        };

        $scope.reloadAds();

        $scope.$on('categorySelectionChanged', function (event, selectedCategoryId) {
            $scope.adsParams.categoryId = selectedCategoryId;
            $scope.adsParams.startPage = 1;
            $scope.reloadAds();
        });

        $scope.$on('townSelectionChanged', function (event, selectedTownId) {
            $scope.adsParams.townId = selectedTownId;
            $scope.adsParams.startPage = 1;
            $scope.reloadAds();
        });
}]);
