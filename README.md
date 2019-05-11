# gun-openstack-swift

OpenStack Swift adapter for gunDB

## Installation

    npm install @notabug/gun-openstack-swift

## Usage

    require("@notabug/gun-openstack-swift").attachToGun(Gun, {
      url: 'https://orbit.brightbox.com/v1/acc-xxx/bucket',
      token: "accesstoken"
    });
