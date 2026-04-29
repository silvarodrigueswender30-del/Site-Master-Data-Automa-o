export default function FooterCTA() {
  return (
    <footer data-wf--footer--variant="base" className="footer">
      <div className="w-layout-blockcontainer container w-container">
        <div className="footer-wrap">

          {/* ── FOOTER TOP ── */}
          <div className="footer-top">
            <div className="footer-links">

              {/* Coluna: Protocolos (footer-links-group-wrap) */}
              <div className="footer-links-group-wrap">
                <div className="text-14-caps green opacity-60">
                  Protocolos
                </div>
                <div className="footer-links-group">
                  <a href="#" className="footer-link w-inline-block">
                    <div className="text-14-caps green">CrioEndolift</div>
                    <div className="underline green"></div>
                  </a>
                  <a href="#" className="footer-link w-inline-block">
                    <div className="text-14-caps green">Ultra MD</div>
                    <div className="underline green"></div>
                  </a>
                  <a href="#" className="footer-link w-inline-block">
                    <div className="text-14-caps green">Hidrolipo</div>
                    <div className="underline green"></div>
                  </a>
                </div>
              </div>

              {/* Bloco sem label (footer-links-group direto) — igual ao bloco blog/contact/mobile do original */}
              <div className="footer-links-group">
                <a href="mailto:contato@stickerestetica.com.br" className="footer-link w-inline-block">
                  <div className="text-14-caps green">E-mail</div>
                  <div className="underline green"></div>
                </a>
                <a href="https://wa.me/5534992360120" className="footer-link w-inline-block">
                  <div className="text-14-caps green">WhatsApp</div>
                  <div className="underline green"></div>
                </a>
                <a href="#" className="footer-link w-inline-block">
                  <div className="text-14-caps green">Instagram</div>
                  <div className="underline green"></div>
                </a>

                {/* Links de política visíveis apenas no mobile */}
                <div className="div-block-3 mobile">
                  <a href="/privacy" className="footer-link w-inline-block">
                    <div className="text-14-caps green">Política de Privacidade</div>
                    <div className="underline green"></div>
                  </a>
                  <a href="/terms-of-use" className="footer-link w-inline-block">
                    <div className="text-14-caps green">Termos de Uso</div>
                    <div className="underline green"></div>
                  </a>
                </div>
              </div>

            </div>

            {/* footer-right: CTA de contato + redes sociais */}
            <div className="footer-right">
              <div className="gap-20">
                <div className="text-14-caps green align-right">
                  se tiver alguma dúvida,
                  <br />
                  fique à vontade para nos contatar:
                </div>
                <a href="mailto:contato@stickerestetica.com.br" className="footer-link w-inline-block">
                  <div className="text-20-medium">
                    <div className="link-2">
                      CONTATO@STICKERESTETICA.COM.BR
                    </div>
                  </div>
                  <div className="underline green"></div>
                </a>
              </div>
              <div className="socials-group">
                <a href="https://www.instagram.com/stickerestetica" target="_blank" rel="noreferrer" className="footer-link w-inline-block">
                  <div className="text-14-caps green">instagram</div>
                  <div className="underline green"></div>
                </a>
              </div>
            </div>
          </div>

          {/* ── FOOTER BOTTOM ── */}
          <div className="footer-bottom">

            {/* Copyright */}
            <div className="text-14-caps green">
              © 2026. STICKER ESTÉTICA INC.
            </div>

            {/* Ícone/logo central — equivalente ao farm-icon-green-wrap */}
            <div className="farm-icon-green-wrap">
              <div className="farm-icon-green w-embed">
                {/* SVG do logo da Sticker Estética aqui */}
              </div>
            </div>

            {/* Links de política + website by */}
            <div className="footer-bottom-links">
              <div className="div-block-3">
                <a href="/privacy" className="footer-link w-inline-block">
                  <div className="text-14-caps green">Política de Privacidade</div>
                  <div className="underline green"></div>
                </a>
                <a href="/terms-of-use" className="footer-link w-inline-block">
                  <div className="text-14-caps green">Termos de Uso</div>
                  <div className="underline green"></div>
                </a>
              </div>
              <a href="https://antigravidade.studio" target="_blank" rel="noreferrer" className="footer-link adelt w-inline-block">
                <div className="text-14-caps green xx adelt-text">
                  website by
                </div>
                <div className="underline green"></div>
                <div className="adelt-wrap-logo">
                  <div className="adelt-green w-embed">
                    {/* SVG do logotipo da Antigravidade aqui */}
                  </div>
                </div>
              </a>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}
