
export const dynamic = "force-dynamic";
const whoiser = require('whoiser')
function normalizeString(v) {
  if (!v && v !== 0) return null;
  return String(v).trim();
}
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const domain = normalizeString(searchParams.get("domain"));

    if (!domain) {
      return new Response(JSON.stringify({ error: "No domain provided" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    const result = await whoiser.whoisDomain(domain);

    const server = Object.keys(result)[0];
    const info = result[server] || {};
    const domainNames = [
      info.domainName,
      info["Domain Name"],
      info.domain,
      info.domain_name,
      info["Registry Domain ID"],
      info["Created Date"]
    ].filter(Boolean);
    const registryId = info.registryDomainId || info["Registry Domain ID"] || info.registry_domain_id;
    const created = info.creationDate || info["Creation Date"] || info.createdDate || info.created || info["Created Date"];
    const expires = info.expirationDate || info["Expiry Date"] || info["Expiration Date"] || info.expires || info["Expiry Date"];
    const updated = info.updatedDate || info["Updated Date"] || info.lastUpdated || info.updated;

    const registrar =
      info.registrar ||
      info["Registrar"] ||
      info["registrarName"] ||
      info["Registrar WHOIS Server"] ||
      null;
    // nameservers may be array or space/newline separated string
    let nameservers = info.nameServer || info.nameServers || info.nameservers || info.nameserver || info["Name Server"] || info["Name Servers"] || null;
    if (typeof nameservers === "string") {
      nameservers = nameservers.split(/[\s,;]+/).map(s => s.trim()).filter(Boolean);
    }
    if (!Array.isArray(nameservers)) nameservers = nameservers ? [nameservers] : [];

    // Heuristic: if domain name or registry id or creation exist => taken
    const isTaken =
      info["Domain Name"] ||
      info["Registry Domain ID"] ||
      info["Created Date"];

    const available = !isTaken;

    // Build the standardized response (B)
    const payload = {
      available,
      domain: domain || null,
      created: created ? normalizeString(created) : null,
      updated: updated ? normalizeString(updated) : null,
      expires: expires ? normalizeString(expires) : null,
      registrar: registrar ? normalizeString(registrar) : null,
      nameservers,
      raw: result,
    };

    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });



    return Response.json({ available, info, raw: result });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
