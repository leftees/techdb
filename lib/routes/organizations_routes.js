let organizationsRoutes = FlowRouter.group({
  prefix: '/organizations',
  name: 'Organizations'
});

organizationsRoutes.route('/', {
  name: 'organizations.dashboard',
  title: 'Organizations Dashboard',
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'organizationsDashboard'
    });
  }
});


organizationsRoutes.route('/add', {
  name: 'organizations.add',
  parent: 'organizations.dashboard',
  title: 'New Organization',
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'organizationsAdd'
    });
  },
});

organizationsRoutes.route('/:id/entry', {
  name: 'organizations.entry',
  parent: 'organizations.dashboard',
  title() {
    let organization = Organizations.findOne({
      _id: FlowRouter.getParam('id')
    });
    return organization && organization.name;
  },
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'organizationsEntry'
    });
  },
});


organizationsRoutes.route('/:id/edit', {
  name: 'organizations.edit',
  parent: 'organizations.entry',
  title: 'Edit',
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'organizationsEdit'
    });
  },
  subscriptions(params) {
    this.register('organization', subs.subscribe('organization', params.id));
  }
});
