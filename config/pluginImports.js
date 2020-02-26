import cms from 'cms';


//repair path here
// const req = require.context('../../plugins/attendance-plugin/components', true, /.*\.vue$/);
// req.keys().map(file => {
//   const component = req(file).default;
//   const compName = file.split('/').pop().split('.vue')[0];
//   cms.registerComponent(compName, {}, component);
// });

const cloudSignageReq = require.context('../plugins/cloud-signage-plugin', true, /.*\.vue$/);
cloudSignageReq.keys().map(file => {
  const component = cloudSignageReq(file).default;
  const compName = file.split('/').pop().split('.vue')[0];
  cms.registerComponent(compName, {}, component);
});

// cms.registerComponent('TestImport', {}, TestImport);
