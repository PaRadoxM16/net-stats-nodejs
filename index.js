const fs = require('fs')
const stats_location = "/sys/class/net/[]/statistics/";

function net_stats(interface) {
    const file_location = stats_location.replace("[]", interface);
    const all_stats = {
        rx_packets: null,
        tx_packets: null,
        rx_bytes: null,
        tx_bytes: null
    };
    for (const stat in all_stats) {
        const value = fs.readFileSync(file_location+stat, {encoding: 'utf-8'});
        all_stats[stat] = parseInt(value.replace('\n', '')) // Each stat includes \n at the end
    };
    return all_stats;
};

console.log(net_stats('eth0'))
