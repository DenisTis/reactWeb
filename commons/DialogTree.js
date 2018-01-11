//Use AJV Scheme to build a template
//build a tool to edit dialogues
//create a new npm package for it
//Here we should load our dialogs json model
//Most probably an API would be required to edit dialogue files
//Probably a different component should be responsible for it.
//model structure:
let object = {
  id: "dialogPositionId",//not optional
  //Probably there is just a scene description, no dialog characters exist
  description: "i18n.descriptionId", //if exists. Check how can be multiline object
  person: {
    image: "assets path",//if exists
    name: "i18n.personId"
  },
  personText: "i18n. Person text",
  reply: [ //optional (if not provided, dialog has to be closed)
    {
      text: "i18n.description", //not optional,
//If character can see it at all
      displayCondition: {
        propertyName: "Stats property to be checked",
        requiredValue: "minimum value to be reached"
      },
//If character will be able to achieve what he wants
      next: [{
        nextId:"dialogPositionId", //not optional,
        saveSelection: "true",//if it is needed to be passed to interface after dialog close
        achievement: "i18n.descriptionId",//Inform user if he got or lost something
        propertyName: "Stats property to be checked",
        requiredValue: "minimum value to be reached",
        nextFailedId: "dialogPositionId", //not optional
      }]
    },
    {
//Minimum parameters
      text: "i18n.description", //not optional,
      //If character will be able to achieve what he wants
            next: [{
              nextId:"dialogPositionId" //not optional
            }]
          },
  ]
}
