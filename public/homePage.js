"use strict"

let logoutButton = new LogoutButton();

logoutButton.action = () => {
	ApiConnector.logout((response) => {
		if (response.success) {
			location.reload();
		}
	});
};

ApiConnector.current((response) => {
	if (response.success) {
		ProfileWidget.showProfile(response.data);
	}
});

let ratesBoard = new RatesBoard();

function getRates() {
	ApiConnector.getStocks((response) => {
		if (response.success) {
			ratesBoard.clearTable();
			ratesBoard.fillTable(response.data);
		}
	});
}

getRates();

setInterval(getRates, 60000);

let moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = function(data) {
	ApiConnector.addMoney(data, (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			this.setMessage(true, 'Операция выполнена успешно');
		} else {
			this.setMessage(false, response.error);
		}
	});
}

moneyManager.conversionMoneyCallback = function(data) {
	ApiConnector.convertMoney(data, (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			this.setMessage(true, 'Операция выполнена успешно');
		} else {
			this.setMessage(false, response.error);
		}
	});
}

moneyManager.sendMoneyCallback = function(data) {
	ApiConnector.transferMoney(data, (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			this.setMessage(true, 'Операция выполнена успешно');
		} else {
			this.setMessage(false, response.error);
		}
	});
}

let favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
	if (response.success) {
		favoritesWidget.clearTable();
		favoritesWidget.fillTable(response.data);
		moneyManager.updateUsersList(response.data);
	}
});

favoritesWidget.addUserCallback = function(data) {
	ApiConnector.addUserToFavorites(data, (response) => {
		if (response.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(response.data);
			moneyManager.updateUsersList(response.data);
			this.setMessage(true, 'Операция выполнена успешно');
		} else {
			this.setMessage(false, response.error);
		}
	});
}

favoritesWidget.removeUserCallback = function(data) {
	ApiConnector.removeUserFromFavorites(data, (response) => {
		if (response.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(response.data);
			moneyManager.updateUsersList(response.data);
			this.setMessage(true, 'Операция выполнена успешно');
		} else {
			this.setMessage(false, response.error);
		}
	});
}